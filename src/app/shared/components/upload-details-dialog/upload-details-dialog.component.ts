import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadService } from 'src/app/upload/upload.service';
import { Image } from '../../models/upload';

@Component({
  selector: 'app-upload-details-dialog',
  templateUrl: './upload-details-dialog.component.html',
  styleUrls: ['./upload-details-dialog.component.scss']
})
export class UploadDetailsDialogComponent implements OnInit {


  @Output() update = new EventEmitter<any>();

  uploadDetailsDialog: boolean = false;
  displayDialogSpinner: boolean = false;
  displaySubmitBtn: boolean = true;
  dialogTitle = 'جزییات پیوست';
  image!: Image;
  imageAlt = '';
  saveSpinner = false;
  constructor(private uploadService: UploadService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  clear() {
    this.messageService.clear('uploadDetailsDialogToast');
  }
  updateUploadDetails(){

  }

  showUploadDetailsDialog(image: Image | null = null): void | boolean {
    if (image) {
      if (image.isRemoved || image.isEdited) {
        return false;
      }
      this.image = image;
      this.imageAlt = image.alternateText;
      this.uploadDetailsDialog = true;
    }
  }

  hideDialog() {

  }



}
