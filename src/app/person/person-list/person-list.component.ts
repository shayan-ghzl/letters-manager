import { Component } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent  {

  tableHeadline = 'جدول لیست اشخاص';
  requestRoute = 'lm/v1/person';
  addRouter = '/person/create';
  editRouter = '/person/edit';
  idAttributeKey = 'customerUUID';
  nameAttributeKey = 'firstName';
  columns = [
    {
      name: 'نام',
      field: 'firstName',
    },
    {
      name: 'نام خانوادگی',
      field: 'lastName',
    },
    {
      name: 'نام پدر',
      field: 'fatherName',
    },
    {
      name: 'کد ملی',
      field: 'nationalID',
    },
    {
      name: 'شماره شناسنامه',
      field: 'certificateNumber',
    },
    {
      name: 'محل تولد',
      field: 'fromLocation',
    },
    {
      name: 'تاریخ تولد',
      field: 'stringBirthDate',
    },
    {
      name: 'آدرس',
      field: 'address',
    },
    {
      name: 'تلفن',
      field: 'phoneNumber',
    },

  ];
  displayedColumns = ['position', 'firstName', 'lastName', 'fatherName', 'nationalID', 'certificateNumber', 'fromLocation', 'stringBirthDate', 'address', 'phoneNumber', 'opration'];

  constructor() { }
  
}
