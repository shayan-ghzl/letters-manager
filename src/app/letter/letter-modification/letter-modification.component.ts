import { Component } from '@angular/core';
import { CardFormControls } from 'src/app/shared/model/model';

@Component({
  selector: 'app-letter-modification',
  templateUrl: './letter-modification.component.html',
  styleUrls: ['./letter-modification.component.scss']
})
export class LetterModificationComponent {

  formTitle = ['افزودن', 'قلنامه'];
  requestRoute = 'lm/v1/letter';
  idAttributeKey = 'letterUUID';
  cardFormControls: CardFormControls[] = [
    {
      'formControlName': 'fileNumber',
      'fieldErrorMessage': 'بین 2 تا 10 حرف مجاز است',
      'persianLable': 'شماره برونده',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 10,
      }
    },
    {
      'formControlName': 'accountingCode',
      'fieldErrorMessage': 'بین 2 تا 10 حرف مجاز است',
      'persianLable': 'کد حسابداری',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 10,
      }
    },
    {
      'formControlName': 'stringDate',
      'fieldErrorMessage': 'xxxx/xx/xx فرمت مجاز می باشد',
      'persianLable': 'تاریخ',
      'validation': {
        'isRequired': true,
        'pattern': '^[1-4]\\d{3}\\/((0[1-6]\\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\\/(30|([1-2][0-9])|(0[1-9]))))$'
      }
    },
    // {
    //   'formControlName': 'sellerId',
    //   'fieldErrorMessage': 'بین 2 تا 30 حرف مجاز است',
    //   'persianLable': 'فروشنده',
    //   'validation': {
    //     'isRequired': true,
    //     'minLength': 2,
    //     'maxLength': 30,
    //   }
    // },
    // {
    //   'formControlName': 'buyerId',
    //   'fieldErrorMessage': 'بین 2 تا 30 حرف مجاز است',
    //   'persianLable': 'خریدار',
    //   'validation': {
    //     'isRequired': true,
    //     'minLength': 2,
    //     'maxLength': 30,
    //   }
    // },
    // {
    //   'formControlName': 'itemId',
    //   'fieldErrorMessage': 'بین 2 تا 30 حرف مجاز است',
    //   'persianLable': 'وسیه نفلیه',
    //   'validation': {
    //     'isRequired': true,
    //     'minLength': 2,
    //     'maxLength': 30,
    //   }
    // },
  ];

  constructor() { }
}
