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
  categories: MediaCategory[] = [];
  allCategories: MediaCategory[] = [];

  constructor(private uploadService: UploadService) {
    this.getAllCategories();
  }

  ngOnInit(): void {
  }

  getCategories(params: MediaCategoryParams) {
    this.uploadService.getCategories(params).subscribe(
      (data) => {
        this.tableRowsTotal = data.totalElements;
        data.content.forEach((Element: MediaCategory) => {
          Element.isSelected = false;
          Element.isEdited = false;
        });
        this.categories = data.content;
        console.log(this.categories);
      },
      (error) => { console.log(error); },
      () => { },
    );
  }
  getAllCategories() {
    this.uploadService.getCategories({ page: this.currentPage, size: 20 }).subscribe(
      (data) => {
        this.tableRowsTotal = data.totalElements;
        data.content.forEach((Element: MediaCategory) => {
          Element.isSelected = false;
          Element.isEdited = false;
        });
        this.allCategories.push(data.content);
        // this.allCategories = [...this.allCategories, ...data.content];
        if(this.currentPage == 0){
          this.categories = data.content;
        }
        if (this.tableRowsTotal > this.allCategories.length) {
          this.currentPage++;
          this.getAllCategories();
        } else {
          this.currentPage = 0;
          console.log(this.allCategories);
        }
      },
      (error) => { console.log(error); },
      () => { },
    );
  }
}
