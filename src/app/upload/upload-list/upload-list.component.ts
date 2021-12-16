import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadDetailsDialogComponent } from 'src/app/shared/components/upload-details-dialog/upload-details-dialog.component';
import { Image, ImageParams } from 'src/app/shared/models/upload';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {

  @ViewChild(UploadDetailsDialogComponent) uploadDetailsDialogComponent!: UploadDetailsDialogComponent;
  images: Image[] = [];
  tableRowsTotal!: number;
  tableRows: number = 5;
  currentPage: number = 0;
  isDone = false;
  showLoading: boolean = false;


  uploadedFiles:any[] = [];


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
  openUploadDetailsDialog(image:Image){
    this.uploadDetailsDialogComponent.showUploadDetailsDialog(image);
  }







  onUpload(event: any) {
    console.log(event);
    console.log(event.target.files);
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    if (this.uploadedFiles.length) {
      this.uploadFile(this.uploadedFiles);
    }else {
     console.log('فایلی انتخاب نشده است');
    }

  }

  uploadFile(files: any[]) {
    this.uploadService.uploadImages(files).subscribe(response => {
      console.log(response);
    }, (error) => {
      console.log('error');
      console.log(error);
    });
  }


}
