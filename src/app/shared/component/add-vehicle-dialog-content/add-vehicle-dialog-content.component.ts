import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardFormControls } from '../../model/model';
import { UploadSelectDialogContentComponent } from '../upload-select-dialog-content/upload-select-dialog-content.component';

@Component({
  selector: 'app-add-vehicle-dialog-content',
  templateUrl: './add-vehicle-dialog-content.component.html',
  styleUrls: ['./add-vehicle-dialog-content.component.scss']
})
export class AddVehicleDialogContentComponent implements OnInit {

  formTitle = ['افزودن', 'وسیله نقلیه'];
  requestRoute = 'lm/v1/item/vehicle';
  idAttributeKey = 'itemUUID';
  cardFormControls: CardFormControls[] = [
    {
       'field': { 'type': 'input' },
      'formControlName': 'system',
      'fieldErrorMessage': 'بیش از 50 حرف مجاز نیست',
      'persianLable': 'سیستم',
      'validation': {
        'isRequired': false,
        'maxLength': 50,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'color',
      'fieldErrorMessage': 'بیش از 50 حرف مجاز نیست',
      'persianLable': 'رنگ',
      'validation': {
        'isRequired': false,
        'maxLength': 50,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'chassisNumber',
      'fieldErrorMessage': 'بیش از 100 حرف مجاز نیست',
      'persianLable': 'شماره شاسی',
      'validation': {
        'isRequired': false,
        'maxLength': 100,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'motorNumber',
      'fieldErrorMessage': 'بیش از 50 حرف مجاز نیست',
      'persianLable': 'شماره موتور',
      'validation': {
        'isRequired': false,
        'maxLength': 50,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'bodyNumber',
      'fieldErrorMessage': 'بیش از 50 حرف مجاز نیست',
      'persianLable': 'شماره بدنه',
      'validation': {
        'isRequired': false,
        'maxLength': 50,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'vin',
      'fieldErrorMessage': 'بیش از 100 حرف مجاز نیست',
      'persianLable': 'شماره vin',
      'validation': {
        'isRequired': false,
        'maxLength': 100,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'plaque',
      'fieldErrorMessage': 'بین 3 تا 50 حرف مجاز است',
      'persianLable': 'شماره بلاک',
      'validation': {
        'isRequired': true,
        'minLength': 3,
        'maxLength': 50,
      }
    },
    {
      'field': {
        type: 'imagePicker', openAddDialog: UploadSelectDialogContentComponent, objectAttribute: 'medias', requestRoute: '', objectLabel: []
      },
      'formControlName': 'mediaIds',
      'fieldErrorMessage': '',
      'persianLable': 'پیوست',
      'validation': {
        'isRequired': false,
      }
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddVehicleDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
   
  }

  ngOnInit(): void {
  }

  update(e:any){
    this.dialogRef.close(e);
  }

}
