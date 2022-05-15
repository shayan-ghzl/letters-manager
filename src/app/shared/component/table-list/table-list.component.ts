import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RemoveConfirmationDialogContentComponent } from '../remove-confirmation-dialog-content/remove-confirmation-dialog-content.component';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  showLoading = true;
  // search
  searchField = '';
  searchFieldTimeout = setTimeout(() => { }, 200);
  // table
  tableRows: any[] = [];
  dataSource!: MatTableDataSource<any>;
  totalRows = 0;
  pageSize = 10;
  // inputs
  @Input() tableHeadline = '';
  @Input() requestRoute = '';
  @Input() addRouter = '';
  @Input() editRouter = '';
  @Input() columns: { name: string; field: string; subProperty?: { type: string; readableProperty: string; } }[] = [];
  @Input() displayedColumns: string[] = [];
  // this is used for delete request
  @Input() idAttributeKey = '';
  // this is used for show in confirm dialog
  @Input() nameAttributeKey = '';

  //   @ViewChild(MatPaginator, {static : false}) paginator!: MatPaginator;
  //   ngAfterViewInit(){
  //     this.paginator._intl.itemsPerPageLabel = 'Barèmes par page ';
  //  }
  constructor(private http: HttpClient, public dialog: MatDialog, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadTable({ pageIndex: 0 });
  }

  loadTable(e: any) {
    this.pageSize = e.pageSize ? e.pageSize : this.pageSize;
    this.getObservable({ page: e.pageIndex, size: this.pageSize, keyword: this.searchField }).subscribe(
      (response) => {
        // console.log(response);
        response.content.forEach((Element: any, Index: number) => {
          Element.position = (e.pageIndex * this.pageSize) + (Index + 1);
        });
        this.tableRows = response.content;
        this.totalRows = response.totalElements;
        this.dataSource = new MatTableDataSource<any>(this.tableRows);
        if(response.totalElements == 0){
          this.showLoading = false;
        }
      }
    );
  }

  getObservable(parameters: any) {
    let params = new HttpParams();
    if (typeof parameters.page !== 'undefined') {
      params = params.append('page', parameters.page);
    }
    if (typeof parameters.size !== 'undefined') {
      params = params.append('size', parameters.size);
    }
    if (parameters.sort) {
      params = params.append('sort', parameters.sort);
    }
    if (parameters.order) {
      params = params.append('order', parameters.order);
    }
    if (parameters.keyword) {
      params = params.append('keyword', parameters.keyword);
    }
    return this.http.get<any>(environment.apiUrl + this.requestRoute, { params: params });
  }

  tableSearch() {
    clearTimeout(this.searchFieldTimeout);
    this.searchFieldTimeout = setTimeout(() => {
      this.loadTable({ pageIndex: 0 });
    }, 200);
  }

  openDialog(element: any) {
    let dialogRef = this.dialog.open(RemoveConfirmationDialogContentComponent, {
      width: '300px',
      data: { element: element, nameInDialog: element[this.nameAttributeKey] },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete<any>(environment.apiUrl + this.requestRoute + '/' + result[this.idAttributeKey]).subscribe({
          next: response => {
            result.isRemoved = true;
            const index = this.tableRows.indexOf(result);
            if (index > -1) {
              this.tableRows.splice(index, 1);
            }
            setTimeout(() => {
              this.dataSource = new MatTableDataSource<any>(this.tableRows);
            }, 1000);
            this.matSnackBar.open(`مورد ${result.position} (${result[this.nameAttributeKey]}) حذف گردید.`, 'بستن', {
              duration: 7000,
              direction: 'rtl',
              panelClass: '',
            });
          },
          error: error => {
            result.isEdited = true;
            setTimeout(() => {
              result.isEdited = false;
            }, 7000);
            this.matSnackBar.open(`خطا: ${error.error.message}.`, 'بستن', {
              duration: 7000,
              direction: 'rtl',
              panelClass: '',
            });
          },
        });
      }
    });
  }

}