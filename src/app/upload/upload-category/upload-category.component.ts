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

  constructor(private uploadService: UploadService) {
    this.getAllCategories();

  }

  ngOnInit(): void {
  }

  getAllCategories() {
    this.uploadService.getCategories({ page: this.currentPage, size: 10 }).subscribe(
      (data) => {
        this.tableRowsTotal = data.totalElements;
        console.log(this.flat2(data.content));
        data.content.forEach((Element: MediaCategory) => {
          this.allCategories = [...this.allCategories, ...this.flat(Element)];
        });
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



  // this method is for conver tree like object to list
  flat2(array: MediaCategory[]) {
    let result: MediaCategory[] = [];
    array.forEach((Element: MediaCategory) => {
      result.push(Element);
      if (Array.isArray(Element.children)) {
        result = result.concat(this.flat2(Element.children));
      }
    });
    return result;
  }


  // these two method are for conver tree like object to list
  flatten(children: MediaCategory[]): MediaCategory[] {
    return Array.prototype.concat.apply(
      children,
      children.map(x => this.flatten(x.children))
    );
  }

  flat(treeStructure: MediaCategory) {
    let temp = this.flatten(treeStructure.children);
    temp.unshift(treeStructure);
    temp.map((x: MediaCategory) => {
      x.isSelected = false;
      x.isEdited = false;
    });
    return temp;
  }
}
