import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddMediaCategoryDialogContentComponent } from 'src/app/shared/component/add-media-category-dialog-content/add-media-category-dialog-content.component';
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
       'field': { 'type': 'input' },
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
       'field': { 'type': 'textarea' },
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
        type: 'select',openAddDialog:AddMediaCategoryDialogContentComponent , objectAttribute:'category', requestRoute: 'lm/v1/media/category', objectLabel: [
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
      // 'formControlName': 'categoryUUID',
      'formControlName': 'parentId',
      'fieldErrorMessage': '',
      'persianLable': 'دسته بندی پدر',
      'validation': {
        'isRequired': false,
      }
    },
  ];

  constructor() { }

}
