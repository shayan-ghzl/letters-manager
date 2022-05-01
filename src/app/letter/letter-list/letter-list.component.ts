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
    {
      name: 'خریدار',
      field: 'buyer',
      subProperty: { type: 'object', readableProperty: 'firstName' },
    },
    {
      name: 'فروشنده',
      field: 'seller',
      subProperty: { type: 'object', readableProperty: 'firstName' },
    },
    {
      name: 'وسیله نقیله',
      field: 'item',
      subProperty: { type: 'object', readableProperty: 'system' },
    },

  ];


  displayedColumns = ['position', 'accountingCode', 'stringDate', 'buyer', 'seller', 'item', 'opration'];

  constructor() { }

}
