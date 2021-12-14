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
  tableRows: number = 5;
  currentPage: number = 0;
  isDone = false;
  showLoading: boolean = false;

  constructor(private uploadService: UploadService) {
    this.getImages({ size: this.tableRows, page: this.currentPage });
  }

  ngOnInit(): void {
  }
  getImages(params: ImageParams) {
    if (!this.isDone) {
      this.showLoading = true;
      this.uploadService.getImages(params).subscribe(
        (data) => {
          console.log('next');
          this.tableRowsTotal = data.totalElements;
          this.images = [...this.images, ...data.content];
          this.showLoading = false;
        },
        (error) => { console.log(error); },
        () => {
          console.log('finally');
          if (this.images.length == this.tableRowsTotal) {
            this.isDone = true;
          }
        },
      );
    }
  }
  loadMoreImage() {
    this.getImages({ size: this.tableRows, page: this.currentPage++ });
  }
}
