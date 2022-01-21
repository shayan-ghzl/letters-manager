import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  tableRows: number = 20;
  currentPage: number = 0;
  isDone = false;
  showLoading: boolean = false;
  editedMediaIndex = 0;



  constructor(private uploadService: UploadService, private messageService: MessageService) {
    this.getImages({ size: this.tableRows, page: this.currentPage });
  }

  ngOnInit(): void {
  }
  getImages(params: ImageParams) {
    if (!this.isDone) {
      this.showLoading = true;
      this.uploadService.getImages(params).subscribe(
        (data) => {
          this.tableRowsTotal = data.totalElements;
          this.images = [...this.images, ...data.content];
          this.showLoading = false;
        },
        (error) => { console.log(error); },
        () => {
          if (this.images.length >= this.tableRowsTotal) {
            this.isDone = true;
          }
        },
      );
    }
  }
  loadMoreImage() {
    this.currentPage = this.currentPage + 1;
    this.getImages({ size: this.tableRows, page: this.currentPage });
  }
  openUploadDetailsDialog(image: Image, index: number) {
    this.editedMediaIndex = index;
    this.uploadDetailsDialogComponent.showUploadDetailsDialog(image);
  }
  imageUpdated(image: Image) {
    this.images[this.editedMediaIndex] = image;
   }

  onUpload(fileObject: any) {
    for (let file of fileObject.files) {
      var filesize = +((file.size / 1024) / 1024).toFixed(4); // MB
      if (typeof file.name != "undefined" && filesize <= 10) {
        this.uploadService.uploadImages(file).subscribe((response) => {
          this.images.unshift(response);
          this.tableRowsTotal++;
        }, (error) => {
          this.messageService.add({ key: 'uploadListToast', severity: 'error', summary: 'خطا', detail: 'خطا رخ داد.', life: 7000 });
        });
      } else {
        this.messageService.add({ key: 'uploadListToast', severity: 'error', summary: 'خطا', detail: 'حجم فایل بیشتر از حد مجاز است.', life: 7000 });
      }
    }
  }

}
