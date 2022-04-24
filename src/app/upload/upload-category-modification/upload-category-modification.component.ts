import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardFormControls } from 'src/app/shared/model/model';


@Component({
  selector: 'app-upload-category-modification',
  templateUrl: './upload-category-modification.component.html',
  styleUrls: ['./upload-category-modification.component.scss']
})
export class UploadCategoryModificationComponent {
  formTitle = ['افزودن', 'دسته بندی رسانه'];
  requestRoute = 'lm/v1/media/category';
  idAttributeKey = 'categoryUUID';
  cardFormControls: CardFormControls[] = [
    {
      'formControlName': 'name',
      'fieldErrorMessage': 'بین 2 تا 70 حرف مجاز است',
      'persianLable': 'نام',
      'validation': {
        'isRequired': true,
        'minLength': 2,
        'maxLength': 70,
      }
    },
    {
      'formControlName': 'description',
      'fieldErrorMessage': 'بیش از 150 حرف مجاز نیست',
      'persianLable': 'توضیح',
      'validation': {
        'isRequired': false,
        'maxLength': 150,
      }
    },
    {
      'field': {
        type: 'select', objectAttribute:'category', requestRoute: 'lm/v1/media/category', objectLabel: [
          {
            persianKey: 'نام:',
            attribute: 'name',
            separator: ' - ',
          },
          {
            persianKey: 'توضیح:',
            attribute: 'description',
            separator: '',
          }
        ]
      },
      'formControlName': 'categoryUUID',
      'fieldErrorMessage': '',
      'persianLable': 'دسته بندی رسانه',
      'validation': {
        'isRequired': true,
      }
    },
   
  ];

  constructor() { }

}
