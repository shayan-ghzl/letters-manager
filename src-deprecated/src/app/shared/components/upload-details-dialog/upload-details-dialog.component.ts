import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UploadService } from 'src/app/upload/upload.service';
import { Image } from '../../models/upload';

@Component({
  selector: 'app-upload-details-dialog',
  templateUrl: './upload-details-dialog.component.html',
  styleUrls: ['./upload-details-dialog.component.scss']
})
export class UploadDetailsDialogComponent implements OnInit {


  @Output() update = new EventEmitter<Image>();

  uploadDetailsDialog: boolean = false;
  // displayDialogSpinner: boolean = true;
  displaySubmitBtn: boolean = true;
  dialogTitle = 'جزییات پیوست';
  image!: Image;
  imageAlt = '';
  imageDesc = '';
  saveSpinner = false;
  submitBtnDisabled = true;
  validateObj = {
    'alt': {
      'isRequired': false,
      'hasError': false,
      'errorMessage': 'بین 2 تا 70 حرف مجاز است',
      isValid: () => {
        let temp = this.imageAlt.trim().length;
        return (0 <= temp && temp <= 70);
      }
    },
    'description': {
      'isRequired': false,
      'hasError': false,
      'errorMessage': 'باید حداکثر 70 حرف باشد.',
      isValid: () => {
        let temp = this.imageDesc.trim().length;
        return (0 <= temp && temp <= 70);
      }
    },
  };

  constructor(private uploadService: UploadService, private messageService: MessageService,private confirmationService:ConfirmationService) { }

  ngOnInit(): void {
  }

  clear() {
    this.messageService.clear('uploadDetailsDialogToast');
  }
  updateUploadDetails() {
    this.saveSpinner = true;
    this.submitBtnDisabled = true;
    this.uploadService.editImage({
      "mediaUUID": this.image.mediaUUID,
      "description": this.imageDesc,
      "categoriesId": this.image.categories,
      "alternateText": this.imageAlt
    }).subscribe(
      (response) => {
        this.update.emit(response);
        this.saveSpinner = false;
      },
      (error) => {
        this.saveSpinner = false;
      },
    );
  }

  showUploadDetailsDialog(image: Image | null = null): void | boolean {
   
    if (image) {
      if (image.isRemoved || image.isEdited) {
        return false;
      }
      this.image = image;
      this.imageAlt = image.alternateText;
      this.imageDesc = image.description;
      this.uploadDetailsDialog = true;
      this.imageFieldValidation('allField');
      this.submitBtnDisabled = true;
    }
  }

  imageFieldValidation(fieldName: string): boolean {
    switch (fieldName) {
      case 'alt':
        if (this.validateObj.alt.isValid()) {
          this.validateObj.alt.hasError = false;
          return true;
        } else {
          this.validateObj.alt.hasError = true;
          this.submitBtnDisabled = true;
          return false;
        }
        break;
      case 'description':
        if (this.validateObj.description.isValid()) {
          this.validateObj.description.hasError = false;
          return true;
        } else {
          this.validateObj.description.hasError = true;
          this.submitBtnDisabled = true;
          return false;
        }
        break;
      default:
        let isFormValid: number = 0;
        for (const [key, value] of Object.entries(this.validateObj)) {
          if (value.isValid()) {
            value.hasError = false;
            isFormValid++;
          } else {
            value.hasError = true;
            isFormValid--;
          }
        }
        if (Object.entries(this.validateObj).length == isFormValid) {
          this.submitBtnDisabled = false;
          return true;
        } else {
          this.submitBtnDisabled = true;
          return false;
        }
        break;
    }

  }

  hideDialog() {

  }
  showDeleteImageConf(image: Image): void | boolean {
    if (image.isRemoved || image.isEdited) {
      return false;
    }
    this.confirmationService.confirm({
      header: 'پیغام',
      message: `آیا از حذف اطمینان دارید؟`,
      accept: () => {
        this.uploadService.deleteImage(image.mediaUUID).subscribe(
          (response) => {
            // this.update.emit(image);
            this.messageService.add({ key: 'uploadDetailsDialogToast', severity: 'success', summary: 'موفقیت آمیز', detail: `با موفقیت حذف شد`, life: 7000 });
          },
          (error) => {
            // image.hasWarning = true;
            // setTimeout(() => {
            //   image.hasWarning = false;
            // }, 7000);
            this.messageService.add({ key: 'uploadDetailsDialogToast', severity: 'error', summary: 'خطا', detail: error.error.message, life: 7000 });
          },
          () => { },
        );
      }
    });
  }


}
