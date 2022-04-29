import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardFormControls } from '../../model/model';

@Component({
  selector: 'app-add-media-category-dialog-content',
  templateUrl: './add-media-category-dialog-content.component.html',
  styleUrls: ['./add-media-category-dialog-content.component.scss']
})
export class AddMediaCategoryDialogContentComponent implements OnInit {

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
       'field': { 'type': 'input' },
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
        type: 'select',openAddDialog:AddMediaCategoryDialogContentComponent, objectAttribute:'category', requestRoute: 'lm/v1/media/category', objectLabel: [
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
  
  constructor(
    public dialogRef: MatDialogRef<AddMediaCategoryDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
   
  }
  ngOnInit(): void {
  }

  update(e:any){
    this.dialogRef.close(e);
  }
}
