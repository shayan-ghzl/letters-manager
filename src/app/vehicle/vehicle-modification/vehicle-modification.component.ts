import { Component } from '@angular/core';
import { CardFormControls } from 'src/app/shared/model/model';

@Component({
  selector: 'app-vehicle-modification',
  templateUrl: './vehicle-modification.component.html',
  styleUrls: ['./vehicle-modification.component.scss']
})
export class VehicleModificationComponent  {

  formTitle = ['افزودن', 'شرکت'];
  requestRoute = 'lm/v1/company';
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
  ];

  constructor() { }

}