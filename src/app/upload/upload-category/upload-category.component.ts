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

  constructor(private uploadService:UploadService) { 
    this.getCategories({  });
  }

  ngOnInit(): void {
  }

  getCategories(params: MediaCategoryParams) {
    this.uploadService.getCategories(params).subscribe(
      (data) => {
        this.tableRowsTotal = data.totalElements;
        data.content.forEach((Element:MediaCategory) => {
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
}
