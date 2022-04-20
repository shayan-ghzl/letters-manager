import { Component } from '@angular/core';
import { CardFormControls } from 'src/app/shared/model/model';

@Component({
  selector: 'app-letter-modification',
  templateUrl: './letter-modification.component.html',
  styleUrls: ['./letter-modification.component.scss']
})
export class LetterModificationComponent {

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
