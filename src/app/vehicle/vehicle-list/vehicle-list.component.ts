import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  
  tableHeadline = 'جدول لیست وسایل نقلیه';
  requestRoute = 'lm/v1/item/vehicle';
  addRouter = '/vehicle/create';
  editRouter = '/vehicle/edit';
  idAttributeKey = 'itemUUID';
  nameAttributeKey = 'system';
  columns = [
    {
      name: 'سیستم',
      field: 'system',
    },
    {
      name: 'رنگ',
      field: 'color',
    },
    {
      name: 'شماره شاسی',
      field: 'chassisNumber',
    },
    {
      name: 'شماره موتور',
      field: 'motorNumber',
    },
    {
      name: 'شماره بدنه',
      field: 'bodyNumber',
    },
    {
      name: 'شماره vin',
      field: 'vin',
    },
    {
      name: 'شماره بلاک',
      field: 'plaque',
    },
  ];
  displayedColumns = ['position', 'system', 'color', 'chassisNumber', 'motorNumber', 'bodyNumber', 'vin', 'plaque', 'opration'];


  constructor() { }

  ngOnInit(): void {
  }

}
