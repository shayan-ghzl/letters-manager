import { Component } from '@angular/core';


@Component({
  selector: 'app-upload-category-list',
  templateUrl: './upload-category-list.component.html',
  styleUrls: ['./upload-category-list.component.scss']
})
export class UploadCategoryListComponent {

  tableHeadline = 'جدول لیست دسته بندی رسانه';
  requestRoute = 'lm/v1/media/category';
  addRouter = '/upload/category/create';
  columns = [
    {
      name: 'نام',
      field: 'name',
    },
    {
      name: 'شرح',
      field: 'description',
    },
    {
      name: 'نام پدر',
      field: 'fatherName',
    },
    {
      name: 'تعداد',
      field: 'childrenCount',
    },
  ];
  displayedColumns = ['position', 'name', 'description', 'fatherName', 'childrenCount', 'opration'];

  constructor() { }

}
