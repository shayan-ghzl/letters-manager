import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {

  
  tableHeadline = 'جدول لیست کمپانی';
  requestRoute = 'lm/v1/company';
  addRouter = '/company/create';
  editRouter = '/company/edit';
  idAttributeKey = 'customerUUID';
  nameAttributeKey = 'name';
  columns = [
    {
      name: 'آدرس',
      field: 'address',
    },
    {
      name: 'تلفن',
      field: 'phoneNumber',
    },
    {
      name: 'نام',
      field: 'name',
    },
    {
      name: 'نوع',
      field: 'type',
    },
    {
      name: 'شناسه ثبت',
      field: 'registerCode',
    },
    {
      name: 'شناسه ملی',
      field: 'nationalCode',
    },

  ];
  displayedColumns = ['position', 'address', 'phoneNumber', 'name', 'type', 'registerCode', 'nationalCode', 'opration'];


}
