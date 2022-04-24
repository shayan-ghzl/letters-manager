import { Component } from '@angular/core';
import { AddPersonDialogContentComponent } from 'src/app/shared/component/add-person-dialog-content/add-person-dialog-content.component';
import { AddVehicleDialogContentComponent } from 'src/app/shared/component/add-vehicle-dialog-content/add-vehicle-dialog-content.component';
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
       'field': { 'type': 'input' },
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
       'field': { 'type': 'input' },
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
       'field': { 'type': 'input' },
      'formControlName': 'stringDate',
      'fieldErrorMessage': 'xxxx/xx/xx فرمت مجاز می باشد',
      'persianLable': 'تاریخ',
      'validation': {
        'isRequired': true,
        'pattern': '^[1-4]\\d{3}\\/((0[1-6]\\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\\/(30|([1-2][0-9])|(0[1-9]))))$'
      }
    },
    {
      'field': {
        type: 'select', openAddDialog: AddPersonDialogContentComponent, objectAttribute: 'seller', requestRoute: 'lm/v1/person', objectLabel: [
          {
            persianKey: 'نام:',
            attribute: 'firstName',
            separator: ' ',
          },
          {
            persianKey: '',
            attribute: 'lastName',
            separator: ' - ',
          },
          {
            persianKey: 'کد ملی:',
            attribute: 'nationalID',
            separator: '',
          }
        ]
      },
      'formControlName': 'sellerId',
      'fieldErrorMessage': '',
      'persianLable': 'فروشنده',
      'validation': {
        'isRequired': true,
      }
    },
    {
      'field': {
        type: 'select', openAddDialog: AddPersonDialogContentComponent, objectAttribute: 'buyer', requestRoute: 'lm/v1/person', objectLabel: [
          {
            persianKey: 'نام:',
            attribute: 'firstName',
            separator: ' ',
          },
          {
            persianKey: '',
            attribute: 'lastName',
            separator: ' - ',
          },
          {
            persianKey: 'کد ملی:',
            attribute: 'nationalID',
            separator: '',
          }
        ]
      },
      'formControlName': 'buyerId',
      'fieldErrorMessage': '',
      'persianLable': 'خریدار',
      'validation': {
        'isRequired': true,
      }
    },
    {
      'field': {
        type: 'select', openAddDialog: AddVehicleDialogContentComponent, objectAttribute: 'item', requestRoute: 'lm/v1/item/vehicle', objectLabel: [
          {
            persianKey: 'نام:',
            attribute: 'system',
            separator: ' - ',
          },
          {
            persianKey: 'پلاک:',
            attribute: 'plaque',
            separator: '',
          }
        ]
      },
      'formControlName': 'itemId',
      'fieldErrorMessage': '',
      'persianLable': 'وسیله نقلیه',
      'validation': {
        'isRequired': true,
      }
    },
  ];

  constructor() { }
}
