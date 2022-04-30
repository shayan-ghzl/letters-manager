import { Component } from '@angular/core';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.scss']
})
export class LetterListComponent {

  tableHeadline = 'جدول لیست قلنامه';
  requestRoute = 'lm/v1/letter';
  addRouter = '/letter/create';
  editRouter = '/letter/edit';
  idAttributeKey = 'letterUUID';
  nameAttributeKey = 'accountingCode';
  columns = [
    {
      name: 'کد حسابداری',
      field: 'accountingCode',
    },
    {
      name: 'تاریخ',
      field: 'stringDate',
    },
    // {
    //   name: 'شماره پلاک',
    //   field: 'plateNumber',
    // },
    // {
    //   name: 'دستگاه',
    //   field: 'device',
    // },
    // {
    //   name: 'نوع',
    //   field: 'type',
    // },
    // {
    //   name: 'مدل',
    //   field: 'model',
    // },

    // {
    //   name: 'شماره سیستم',
    //   field: 'systemId',
    // },
    // {
    //   name: 'شماره رنگ',
    //   field: 'colorId',
    // },
  ];


  // displayedColumns = ['position', 'accountingCode', 'plateNumber', 'device', 'type', 'model', 'stringDate', 'systemId', 'colorId', 'opration'];
  displayedColumns = ['position', 'accountingCode', 'stringDate', 'opration'];

  constructor() { }

}
