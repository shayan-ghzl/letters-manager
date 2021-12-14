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
  dialogTitle = '';
  dialogStatus = 'addPerson';


  constructor(private uploadService: UploadService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  clear() {
    this.messageService.clear('uploadDetailsDialogToast');
  }

  // showPersonDialog(image: Image | null = null) {
  //   if (image) {
  //     if (image.isRemoved || image.isEdited) {
  //       return false;
  //     }
  //     this.dialogTitle = 'نمایش عکس فلانی';
     
  //   }
  //   this.uploadDetailsDialog = true;
  // }

  hideDialog() {

  }

}
