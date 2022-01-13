import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MediaCategory, MediaCategoryParams, tableColumn } from 'src/app/shared/models/upload';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-category',
  templateUrl: './upload-category.component.html',
  styleUrls: ['./upload-category.component.scss']
})
export class UploadCategoryComponent implements OnInit {

  tableRows: number = 10;
  currentPage: number = 0;
  tableRowsTotal!: number;
  // categories: MediaCategory[] = [];
  allCategories: MediaCategory[] = [];
  rootCheckbox: boolean = false;
  flattenCategoryLevel = -1;
  tableSearch: string = '';
  newCategoryName: string = '';
  newCategoryDesc: string = '';
  newCategoryParent: string = '-1';
  addNewCatSpinner: boolean = false;
  theadColObject: tableColumn[] = [
    {
      name: 'نام',
      class: 'column-name column-primary',
      order: false,
      isSortable: true,
    },
    {
      name: 'توضیح',
      class: 'column-description',
      order: false,//means it is desc
      isSortable: true,
    },
    {
      name: 'تعداد',
      class: 'column-posts',
      order: false,
      isSortable: true,
    },
  ];




  constructor(private uploadService: UploadService) {
    this.getAllCategories();

  }

  ngOnInit(): void {
  }

  getAllCategories() {
    this.uploadService.getCategories({ page: this.currentPage, size: 10 }).subscribe(
      (data) => {
        this.tableRowsTotal = data.totalElements;
        let temp = this.flat(data.content);
        console.log(temp);
        temp.map((x) => {
          x.isSelected = false;
          x.isEdited = false;
        });
        this.allCategories = [...this.allCategories, ...temp];

        if (this.tableRowsTotal > 10) {
          this.currentPage++;
          this.getAllCategories();
        } else {
          this.currentPage = 0;
        }
      },
      (error) => { console.log(error); },
      () => { },
    );
  }
  // getDividedCategories(pageNumber:number){

  // }
  closeEditRow(category: MediaCategory) {
    category.isEdited = !category.isEdited;
    this.allCategories.map((x: MediaCategory) => {
      if (x != category) {
        x.isEdited = false;
      }
    });
  }

  toggleAllCheckboxs() {
    this.allCategories.map((x: MediaCategory) => {
      x.isSelected = this.rootCheckbox;
    });
  }
  toggleCategorySelect() {

  }
  dashLevelCount(n: number = 0): Array<number> {
    return Array(n);
  }
  tableSearchOpration() {
    this.allCategories = this.allCategories.filter((res) => {
      return res.name.toLocaleLowerCase().match(this.tableSearch.toLocaleLowerCase());
    });
  }
  addNewCategory() {
    this.addNewCatSpinner = true;
    let parentId;
    if (this.newCategoryParent == '-1') {
      parentId = null;
    } else {
      parentId = this.allCategories[+this.newCategoryParent].categoryUUID;
    }
    this.uploadService.addCategory({ "categoryUUID": null, "name": this.newCategoryName, "description": this.newCategoryDesc, "parentId": parentId }).subscribe(
      (data) => { console.log(data); },
      (error) => { console.log(error); },
      () => { this.addNewCatSpinner = false; }
    );
  }

  // this method is for conver tree like object to list
  flat(array: MediaCategory[]) {
    let result: MediaCategory[] = [];
    this.flattenCategoryLevel++;
    array.forEach((Element: MediaCategory) => {
      Element.level = this.flattenCategoryLevel;
      result.push(Element);
      result = result.concat(this.flat(Element.children));
    });
    this.flattenCategoryLevel--;
    return result;
  }

}
