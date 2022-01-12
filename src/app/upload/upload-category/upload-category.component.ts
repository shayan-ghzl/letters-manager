import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MediaCategory, MediaCategoryParams } from 'src/app/shared/models/upload';
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
  rootCheckbox:boolean = false;

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

  // this method is for conver tree like object to list
  flat(array: MediaCategory[]) {
    let result: MediaCategory[] = [];
    array.forEach((Element: MediaCategory) => {
      result.push(Element);
      result = result.concat(this.flat(Element.children));
    });
    return result;
  }

}
