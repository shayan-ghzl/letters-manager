import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardFormControls } from '../../model/model';
import { UploadSelectDialogContentComponent } from '../upload-select-dialog-content/upload-select-dialog-content.component';

@Component({
  selector: 'app-add-person-dialog-content',
  templateUrl: './add-person-dialog-content.component.html',
  styleUrls: ['./add-person-dialog-content.component.scss']
})
export class AddPersonDialogContentComponent implements OnInit {

  formTitle = ['افزودن', 'شخص'];
  requestRoute = 'lm/v1/person';
  idAttributeKey = 'customerUUID';
  cardFormControls: CardFormControls[] = [
    {
       'field': { 'type': 'input' },
      'formControlName': 'firstName',
      'fieldErrorMessage': 'بین 2 تا 30 حرف مجاز است',
      'persianLable': 'نام',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 30,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'lastName',
      'fieldErrorMessage': 'بین 2 تا 30 حرف مجاز است',
      'persianLable': 'نام خانوادگی',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 30,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'fatherName',
      'fieldErrorMessage': 'بین 2 تا 30 حرف مجاز است',
      'persianLable': 'نام پدر',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 30,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'nationalID',
      'fieldErrorMessage': '10 رقم مجاز است',
      'persianLable': 'کد ملی',
      'validation': {
        'isRequired': true,
        'minLength': 10,
        'maxLength': 10,
        'pattern': '/^[0-9]*$/'
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'certificateNumber',
      'fieldErrorMessage': 'بین 2 تا 30 رقم مجاز است',
      'persianLable': 'شماره شناسنامه',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 12,
        'pattern': '/^[0-9]*$/'
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'fromLocation',
      'fieldErrorMessage': 'بین 2 تا 30 حرف مجاز است',
      'persianLable': 'صادره',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 30,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'stringBirthDate',
      'fieldErrorMessage': 'xxxx/xx/xx فرمت مجاز می باشد',
      'persianLable': 'تاریخ تولد',
      'validation': {
        'isRequired': true,
        'pattern': '/^[1-4]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/'
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'address',
      'fieldErrorMessage': 'بین 2 تا 350 حرف مجاز است',
      'persianLable': 'آدرس',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 350,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'phoneNumber',
      'fieldErrorMessage': '11 رقم مجاز است',
      'persianLable': 'تلفن',
      'validation': {
        'isRequired': true,
        'minLength': 11,
        'maxLength': 11,
        'pattern': '/^09[0-9]{9}$/'
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
    public dialogRef: MatDialogRef<AddPersonDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
   
  }

  ngOnInit(): void {
  }

  update(e:any){
    this.dialogRef.close(e);
  }

}
