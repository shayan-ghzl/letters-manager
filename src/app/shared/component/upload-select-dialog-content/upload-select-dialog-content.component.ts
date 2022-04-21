import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from 'src/app/upload/upload.service';
import { ImageParams, Image } from '../../model/model';
import { RemoveConfirmationDialogContentComponent } from '../remove-confirmation-dialog-content/remove-confirmation-dialog-content.component';

@Component({
  selector: 'app-upload-select-dialog-content',
  templateUrl: './upload-select-dialog-content.component.html',
  styleUrls: ['./upload-select-dialog-content.component.scss']
})
export class UploadSelectDialogContentComponent {

  images: Image[] = [];
  tableRowsTotal!: number;

  tableRows: number = 20;
  currentPage: number = 0;
  isDone = false;
  showLoading: boolean = false;

  selectedImages: Image[] = [];

  cardForm = new FormGroup({
    alt: new FormControl('', [Validators.maxLength(150)]),
    description: new FormControl('', [Validators.maxLength(255)]),
    category: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<UploadSelectDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private matSnackBar: MatSnackBar, private uploadService: UploadService
  ) {
    console.log(data, 'UploadSelectDialogContentComponent data');
    this.getImages({ page: 0, size: 20 });
  }

  // showPersonDialog(images: Image[] = []) {
  //   images.forEach((Element) => {
  //     Element.isSelected = true;
  //   })
  //   this.selectedImages = images;
  //   // this.DialogUpload = true;
  //   this.getImages({ size: this.tableRows, page: this.currentPage });
  // }

  updateUploadDetails() {
    this.uploadService.editImage({
      // "mediaUUID": this.imageDetails.mediaUUID,
      // "description": this.imageDesc,
      // "categoriesId": this.imageDetails.categories,
      // "alternateText": this.imageAlt
    }).subscribe({
      next: (response: Image) => {
        response.isSelected = true;
        this.images[this.images.findIndex(Element => Element.mediaUUID == response.mediaUUID)] = response;
        this.selectedImages[this.selectedImages.findIndex(Element => Element.mediaUUID == response.mediaUUID)] = response;
      },
      error: (error) => { console.log(error); },
    });
  }

  // hideDialog() {
  //   // for (const [key, value] of Object.entries(this.editImageValidateObj)) {
  //   //   value.hasError = false;
  //   // }
  //   this.showImageDetails = false;
  //   this.selectedImages.forEach((Element) => {
  //     Element.isSelected = false;
  //   });
  //   this.selectedImages = [];
  // }

  getImages(params: ImageParams) {
    this.uploadService.getImages(params).subscribe(
      (response) => {
        console.log(response, 'getImages');
        this.tableRowsTotal = response.totalElements;
        this.images = [...this.images, ...response.content];
      },
      (error) => { console.log(error); },
    );
  }


  selectImage(e: any, image: Image) {
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
    console.log(this.selectedImages[this.selectedImages.length - 1]);
    this.cardForm.controls['alt'].setValue(this.selectedImages[this.selectedImages.length - 1]?.alternateText);
    this.cardForm.controls['description'].setValue(this.selectedImages[this.selectedImages.length - 1]?.description);
  }

  loadMoreImage() {
    this.currentPage = this.currentPage + 1;
    this.getImages({ size: this.tableRows, page: this.currentPage });
  }

  addImage() {
    // if (!this.submitBtnDisabled) {
    //   this.update.emit(this.selectedImages);
    //   this.DialogUpload = false;
    // }
  }

  onUpload(fileObject: any) {
    for (let file of fileObject.files) {
      var filesize = +((file.size / 1024) / 1024).toFixed(4); // MB
      if (typeof file.name != "undefined" && filesize <= 10) {
        // this.mediaFrameTabPanel.upload = false;
        // this.mediaFrameTabPanel.library = true;
        this.uploadService.addImage(file).subscribe((response) => {
          this.images.unshift(response);
          this.tableRowsTotal++;
        }, (error) => {
          // this.messageService.add({ key: 'DialogUploadToast', severity: 'error', summary: 'خطا', detail: 'خطا رخ داد.', life: 7000 });
        });
      } else {
        // this.messageService.add({ key: 'DialogUploadToast', severity: 'error', summary: 'خطا', detail: 'حجم فایل بیشتر از حد مجاز است.', life: 7000 });
      }
    }
  }







  openDialog(element: any) {
    let dialogRef2 = this.dialog.open(RemoveConfirmationDialogContentComponent, {
      width: '300px',
      data: { element: element, nameInDialog: element['name'] },
    });
    dialogRef2.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close(result);
      }
    });
  }



  onSubmit() {
    // console.log('Your order has been submitted', this.cardForm.value);
    this.uploadService.editImage({
      "mediaUUID": this.data.element.mediaUUID,
      "description": this.cardForm.controls['description'].value,
      // "categoriesId": this.selectedCategories,
      "alternateText": this.cardForm.controls['alt'].value
    }).subscribe({
      next: (response) => {
        console.log(response);
        this.matSnackBar.open('ذخیره گردید.', 'بستن', {
          duration: 7000,
          direction: 'rtl',
          panelClass: '',
        });
      },
      error: (error) => {
        console.log(error);
      },
    });

  }
}
