import { Component, OnInit } from '@angular/core';
import { Image, ImageParams } from 'src/app/shared/models/upload';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {
  images: Image[] = [];
  tableRowsTotal!: number;
  tableRows: number = 10;
  currentPage: number = 0;
  constructor(private uploadService:UploadService) {
    this.getImages({ size: this.tableRows, page: this.currentPage });
   }

  ngOnInit(): void {
  }
  getImages(params: ImageParams) {
    this.uploadService.getImages(params).subscribe(
      (data) => {
        this.tableRowsTotal = data.totalElements;
        this.images = data.content;
      },
      (error) => { console.log(error); },
      () => { },
    );
  }
}
