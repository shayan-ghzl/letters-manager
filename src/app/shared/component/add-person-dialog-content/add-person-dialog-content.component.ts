import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardFormControls } from '../../model/model';

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
      'formControlName': 'nationalID',
      'fieldErrorMessage': '10 رقم مجاز است',
      'persianLable': 'کد ملی',
      'validation': {
        'isRequired': true,
        'minLength': 10,
        'maxLength': 10,
        'pattern': '^[0-9]*$'
      }
    },
    {
      'formControlName': 'certificateNumber',
      'fieldErrorMessage': 'بین 2 تا 30 رقم مجاز است',
      'persianLable': 'شماره شناسنامه',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 12,
        'pattern': '^[0-9]*$'
      }
    },
    {
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
      'formControlName': 'stringBirthDate',
      'fieldErrorMessage': 'xxxx/xx/xx فرمت مجاز می باشد',
      'persianLable': 'تاریخ تولد',
      'validation': {
        'isRequired': true,
        'pattern': '^[1-4]\\d{3}\\/((0[1-6]\\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\\/(30|([1-2][0-9])|(0[1-9]))))$'
      }
    },
    {
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
      'formControlName': 'phoneNumber',
      'fieldErrorMessage': '11 رقم مجاز است',
      'persianLable': 'تلفن',
      'validation': {
        'isRequired': true,
        'minLength': 11,
        'maxLength': 11,
        'pattern': '^[0-9]*$'
      }
    },
  ];
  constructor(
    public dialogRef: MatDialogRef<AddPersonDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
   
  }


  ngOnInit(): void {
  }

}
