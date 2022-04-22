import { Component } from '@angular/core';
import { CardFormControls } from 'src/app/shared/model/model';

@Component({
  selector: 'app-vehicle-modification',
  templateUrl: './vehicle-modification.component.html',
  styleUrls: ['./vehicle-modification.component.scss']
})
export class VehicleModificationComponent {

  formTitle = ['افزودن', 'وسیله نقلیه'];
  requestRoute = 'lm/v1/item/vehicle';
  idAttributeKey = 'itemUUID';
  cardFormControls: CardFormControls[] = [
    {
      'formControlName': 'system',
      'fieldErrorMessage': 'بیش از 50 حرف مجاز نیست',
      'persianLable': 'سیستم',
      'validation': {
        'isRequired': false,
        'maxLength': 50,
      }
    },
    {
      'formControlName': 'color',
      'fieldErrorMessage': 'بیش از 50 حرف مجاز نیست',
      'persianLable': 'رنگ',
      'validation': {
        'isRequired': false,
        'maxLength': 50,
      }
    },
    {
      'formControlName': 'chassisNumber',
      'fieldErrorMessage': 'بیش از 100 حرف مجاز نیست',
      'persianLable': 'شماره شاسی',
      'validation': {
        'isRequired': false,
        'maxLength': 100,
      }
    },
    {
      'formControlName': 'motorNumber',
      'fieldErrorMessage': 'بیش از 50 حرف مجاز نیست',
      'persianLable': 'شماره موتور',
      'validation': {
        'isRequired': false,
        'maxLength': 50,
      }
    },
    {
      'formControlName': 'bodyNumber',
      'fieldErrorMessage': 'بیش از 50 حرف مجاز نیست',
      'persianLable': 'شماره بدنه',
      'validation': {
        'isRequired': false,
        'maxLength': 50,
      }
    },
    {
      'formControlName': 'vin',
      'fieldErrorMessage': 'بیش از 100 حرف مجاز نیست',
      'persianLable': 'شماره vin',
      'validation': {
        'isRequired': false,
        'maxLength': 100,
      }
    },
    {
      'formControlName': 'plaque',
      'fieldErrorMessage': 'بین 3 تا 50 حرف مجاز است',
      'persianLable': 'شماره بلاک',
      'validation': {
        'isRequired': true,
        'minLength': 3,
        'maxLength': 50,
      }
    },
  ];

  constructor() { }

}