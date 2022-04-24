import { Component } from '@angular/core';


@Component({
  selector: 'app-upload-category-list',
  templateUrl: './upload-category-list.component.html',
  styleUrls: ['./upload-category-list.component.scss']
})
export class UploadCategoryListComponent {


  idAttributeKey = 'categoryUUID';
  nameAttributeKey = 'name';
  tableHeadline = 'جدول لیست دسته بندی رسانه';
  requestRoute = 'lm/v1/media/category';
  editRouter = '/upload/category/edit';
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
      field: 'parentId',
    },
    {
      name: 'تعداد',
      field: 'childrenCount',
    },
  ];
  displayedColumns = ['position', 'name', 'description', 'parentId', 'childrenCount', 'opration'];

  constructor() { }

}
