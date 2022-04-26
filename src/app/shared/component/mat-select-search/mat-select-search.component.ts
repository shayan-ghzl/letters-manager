import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { map, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppMatSelectOptionLabel } from '../../model/model';

@Component({
  selector: 'app-mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: ['./mat-select-search.component.scss']
})
export class MatSelectSearchComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() openAddDialog: any;
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

  constructor(private http: HttpClient, private dialog: MatDialog) {

  }

  ngOnChanges(changes: SimpleChanges): void {
   if(changes['initialValue'].currentValue){
     this.selectObject.setValue(this.initialValue);
     this.initialValue.currentValue = true;
     this.objects.push(this.initialValue);
   }
  }

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
            let index = response.content.findIndex((p:any) => p == this.initialValue);
            if (index > -1) {
              response.content.splice(index, 1);
            }
            if(this.initialValue){
              response.content.unshift(this.initialValue);
            }
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
