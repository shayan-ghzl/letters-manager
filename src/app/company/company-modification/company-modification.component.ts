import { Component } from '@angular/core';
import { UploadSelectDialogContentComponent } from 'src/app/shared/component/upload-select-dialog-content/upload-select-dialog-content.component';
import { CardFormControls } from 'src/app/shared/model/model';

@Component({
  selector: 'app-company-modification',
  templateUrl: './company-modification.component.html',
  styleUrls: ['./company-modification.component.scss']
})
export class CompanyModificationComponent {

  formTitle = ['افزودن', 'شرکت'];
  requestRoute = 'lm/v1/company';
  idAttributeKey = 'customerUUID';
  cardFormControls: CardFormControls[] = [
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
       'field': { 'type': 'input' },
      'formControlName': 'name',
      'fieldErrorMessage': 'بین 2 تا 250 حرف مجاز است',
      'persianLable': 'نام',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 250,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'type',
      'fieldErrorMessage': 'بین 2 تا 100 حرف مجاز است',
      'persianLable': 'نوع فعالیت',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 100,
      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'registerCode',
      'fieldErrorMessage': 'بین 2 تا 15 رقم مجاز است',
      'persianLable': 'شناسه ثبت',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 15,
        'pattern': '/^\d{2,15}$/'

      }
    },
    {
       'field': { 'type': 'input' },
      'formControlName': 'nationalCode',
      'fieldErrorMessage': 'بین 2 تا 15 رقم مجاز است',
      'persianLable': 'شناسه ملی',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 15,
        'pattern': '/^\d{2,15}$/'

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

  constructor() { }

}