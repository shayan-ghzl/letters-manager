import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadService } from 'src/app/upload/upload.service';
import { Image, ImageParams } from '../../models/upload';

@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.scss']
})
export class DialogUploadComponent implements OnInit {

  @Output() update = new EventEmitter<any>();
  DialogUpload: boolean = false;
  dialogTitle = 'پیوست ها';
  saveSpinner = false;
  // editImage_alt: string = '';
  // editImage_desc: string = '';
  // editImageValidateObj = {
  //   'alt': {
  //     'isRequired': false,
  //     'hasError': false,
  //     'errorMessage': 'بین 2 تا 30 حرف مجاز است',
  //     isValid: () => {
  //       let temp = this.editImage_alt.trim().length;
  //       return (2 <= temp && temp <= 30);
  //     }
  //   },
  //   'description': {
  //     'isRequired': false,
  //     'hasError': false,
  //     'errorMessage': 'بین 2 تا 30 حرف مجاز است',
  //     isValid: () => {
  //       let temp = this.editImage_desc.trim().length;
  //       return (2 <= temp && temp <= 30);
  //     }
  //   },

  // };
  mediaFrameTabPanel = {
    "upload": false,
    "library": true,
  };
  images: Image[] = [];
  tableRowsTotal!: number;
  tableRows: number = 20;
  currentPage: number = 0;
  isDone = false;
  showLoading: boolean = false;
  selectedImages: Image[] = [];
  submitBtnDisabled = true;
  showImageDetails = false;
  imageDetails!: Image;
  imageAlt = '';
  imageDesc = '';
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



  constructor(private uploadService: UploadService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  clear() {
    // this.messageService.clear('DialogUploadToast');
  }
  showPersonDialog(image: Image | null = null): void | boolean {

    this.DialogUpload = true;
    this.getImages({ size: this.tableRows, page: this.currentPage });
  }

  updateUploadDetails() {
    if (!this.submitBtnDisabled) {
      this.saveSpinner = true;
      this.uploadService.editImage({
        "mediaUUID": this.imageDetails.mediaUUID,
        "description": this.imageDesc,
        "categoriesId": this.imageDetails.categories,
        "alternateText": this.imageAlt
      }).subscribe(
        (response: Image) => {
          response.isSelected = true;
          this.images[this.images.findIndex(Element => Element.mediaUUID == response.mediaUUID)] = response;
          this.selectedImages[this.selectedImages.findIndex(Element => Element.mediaUUID == response.mediaUUID)] = response;
          this.saveSpinner = false;
          this.submitBtnDisabled = true;
        },
        (error) => {
          this.saveSpinner = false;
          this.submitBtnDisabled = true;
        },
      );
    }
  }

  // editImageValidate(fieldName: string): boolean|void {

  //   switch (fieldName) {
  //     case 'firstName':
  //       if (this.editImageValidateObj.alt.isValid()) {
  //         this.editImageValidateObj.alt.hasError = false;

  //         return true;
  //       } else {
  //         this.editImageValidateObj.description.hasError = true;
  //         // this.displaySubmitBtn = true;
  //         return false;
  //       }
  //       break;
  //     default:
  //       let isFormValid: number = 0;
  //       for (const [key, value] of Object.entries(this.editImageValidateObj)) {
  //         if (value.isValid()) {
  //           value.hasError = false;
  //           isFormValid++;
  //         } else {
  //           value.hasError = true;
  //           isFormValid--;
  //         }
  //       }
  //       // if (Object.entries(this.editImageValidateObj).length == isFormValid) {
  //       //   this.displaySubmitBtn = false;
  //       //   return true;
  //       // } else {
  //       //   this.displaySubmitBtn = true;
  //       //   return false;
  //       // }

  //       break;
  //   }

  // }
  hideDialog() {
    // for (const [key, value] of Object.entries(this.editImageValidateObj)) {
    //   value.hasError = false;
    // }
    this.showImageDetails = false;
    this.selectedImages.forEach((Element) => {
      Element.isSelected = false;
    });
    this.selectedImages = [];
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

  selectImage(e: any, image: Image) {
    this.imageAlt = image.alternateText;
    this.imageDesc = image.description;
    for (const [key, value] of Object.entries(this.validateObj)) {
        value.hasError = false;
    }
    if (e.ctrlKey) {
      if (image.isSelected) {
        image.isSelected = false;
        var index = this.selectedImages.indexOf(image);
        if (index !== -1) {
          this.selectedImages.splice(index, 1);
        }
      } else {
        image.isSelected = true;
        this.selectedImages.push(image);
      }
    } else {
      this.selectedImages.forEach((Element) => {
        if (Element != image) {
          Element.isSelected = false;
        }
      });
      if (image.isSelected) {
        image.isSelected = false;
        this.selectedImages = [];
      } else {
        image.isSelected = true;
        this.selectedImages = [image];
      }
    }
    if (this.selectedImages.length) {
      this.submitBtnDisabled = false;
      this.imageDetails = this.selectedImages[this.selectedImages.length - 1];
      this.showImageDetails = true;
    } else {
      this.submitBtnDisabled = true;
      this.showImageDetails = false;
    }
  }

  loadMoreImage() {
    this.currentPage = this.currentPage + 1;
    this.getImages({ size: this.tableRows, page: this.currentPage });
  }

  addImage() {
    if (!this.submitBtnDisabled) {

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
  onUpload(fileObject: any) {
    for (let file of fileObject.files) {
      var filesize = +((file.size / 1024) / 1024).toFixed(4); // MB
      if (typeof file.name != "undefined" && filesize <= 10) {
        this.mediaFrameTabPanel.upload = false;
        this.mediaFrameTabPanel.library = true;
        this.uploadService.uploadImages(file).subscribe((response) => {
          this.images.unshift(response);
          this.tableRowsTotal++;
        }, (error) => {
          this.messageService.add({ key: 'DialogUploadToast', severity: 'error', summary: 'خطا', detail: 'خطا رخ داد.', life: 7000 });
        });
      } else {
        this.messageService.add({ key: 'DialogUploadToast', severity: 'error', summary: 'خطا', detail: 'حجم فایل بیشتر از حد مجاز است.', life: 7000 });
      }
    }
  }
}
