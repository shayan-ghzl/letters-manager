import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { last, map, Observable, shareReplay, Subscription, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppMatSelectOptionLabel } from '../../model/model';
import { AddMediaCategoryDialogContentComponent } from '../add-media-category-dialog-content/add-media-category-dialog-content.component';
import { AddPersonDialogContentComponent } from '../add-person-dialog-content/add-person-dialog-content.component';
import { AddVehicleDialogContentComponent } from '../add-vehicle-dialog-content/add-vehicle-dialog-content.component';

@Component({
  selector: 'app-mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: ['./mat-select-search.component.scss']
})
export class MatSelectSearchComponent implements OnInit, AfterViewInit {

  @Input() openAddDialog:any;
  @Input() fieldId = '';
  @Input() initialValue: any;
  @Input() requestRoute = '';
  @Input() objectTitle = '';
  @Input() optionLabels: AppMatSelectOptionLabel[] = [];
  @Output() update = new EventEmitter<Observable<any>>();
  searchSelectTimeout = setTimeout(() => { }, 200);
  selectObject = new FormControl('', Validators.required);
  objects: any[] = [];
  selectGetObservable!: Subscription;
  @ViewChild('select') select!: MatSelect;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.update.emit(this.select.optionSelectionChanges.pipe(
      map((input) => {
        let obj: any = {};
        if (input.source.value?.customerUUID) {
          obj[this.fieldId] = input.source.value?.customerUUID;
        } else {
          obj[this.fieldId] = input.source.value?.itemUUID;
        }
        return obj;
      })
    )
    );
  }

  ngOnInit(): void {
    this.selectObject.setValue(this.initialValue);
  }

  openDialog() {
    let dialogRef = this.dialog.open(this.openAddDialog, {
      width: '85%',
      height: '90%',
      panelClass: ''
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {

      }
    });
  }

  getSelectObjects(e: any) {
    this.selectGetObservable?.unsubscribe();
    clearTimeout(this.searchSelectTimeout);
    if (e.target.value.trim()) {
      this.searchSelectTimeout = setTimeout(() => {
        this.selectGetObservable = this.getObservable({ page: 0, size: 10, keyword: e.target.value.trim() }).subscribe(
          (response: any) => {
            console.log(response.content);
            this.objects = response.content;
          }
        );
      }, 200);
    }
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
}
