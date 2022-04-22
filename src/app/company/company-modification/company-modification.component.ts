import { Component } from '@angular/core';
import { CardFormControls } from 'src/app/shared/model/model';

@Component({
  selector: 'app-company-modification',
  templateUrl: './company-modification.component.html',
  styleUrls: ['./company-modification.component.scss']
})
export class CompanyModificationComponent  {
  
  formTitle = ['افزودن', 'شرکت'];
  requestRoute = 'lm/v1/company';
  idAttributeKey = 'customerUUID';
  cardFormControls: CardFormControls[] = [
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
    {
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
      'formControlName': 'registerCode',
      'fieldErrorMessage': 'بین 2 تا 15 رقم مجاز است',
      'persianLable': 'شناسه ثبت',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 15,
        'pattern': '^[0-9]*$'

      }
    },
    {
      'formControlName': 'nationalCode',
      'fieldErrorMessage': 'بین 2 تا 15 رقم مجاز است',
      'persianLable': 'شناسه ملی',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 15,
        'pattern': '^[0-9]*$'

      }
    },
  ];

  constructor() { }

}