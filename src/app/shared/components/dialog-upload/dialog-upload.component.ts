import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  dialogTitle = '';
  displayDialogSpinner: boolean = false;
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
  images: Image[] = [];
  tableRowsTotal!: number;
  tableRows: number = 20;
  currentPage: number = 0;
  isDone = false;
  showLoading: boolean = false;





  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  clear() {
    // this.messageService.clear('DialogUploadToast');
  }
  showPersonDialog(image: Image | null = null): void | boolean {

    this.DialogUpload = true;
    this.getImages({ size: this.tableRows, page: this.currentPage });
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
  selectImage(image: Image ){

  }
  loadMoreImage() {
    this.currentPage = this.currentPage + 1;
    this.getImages({ size: this.tableRows, page: this.currentPage });
  }
}
