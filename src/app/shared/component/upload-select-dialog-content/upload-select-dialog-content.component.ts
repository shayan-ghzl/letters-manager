import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith, tap } from 'rxjs';
import { UploadService } from 'src/app/upload/upload.service';
import { ImageParams, Image } from '../../model/model';
import { RemoveConfirmationDialogContentComponent } from '../remove-confirmation-dialog-content/remove-confirmation-dialog-content.component';

@Component({
  selector: 'app-upload-select-dialog-content',
  templateUrl: './upload-select-dialog-content.component.html',
  styleUrls: ['./upload-select-dialog-content.component.scss']
})
export class UploadSelectDialogContentComponent {
  selectedIndex = 1;
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
  });
  disableSave!: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<UploadSelectDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private matSnackBar: MatSnackBar, private uploadService: UploadService
  ) {
    console.log(data, 'UploadSelectDialogContentComponent data');
    this.getImages({ page: this.currentPage, size: this.tableRows });
  }

  getImages(params: ImageParams) {
    if (!this.isDone) {
      this.showLoading = true;
      this.uploadService.getImages(params).subscribe({
        next: (response) => {
          this.tableRowsTotal = response.totalElements;
          response.content.forEach((Element: Image) => {
            if(this.data.selectedImage.filter((p:Image) => p.mediaUUID == Element.mediaUUID).length){
              Element.isSelected = true;
            }
          });
          this.images = [...this.images, ...response.content];
          this.showLoading = false;
          if (this.images.length >= this.tableRowsTotal) {
            this.isDone = true;
          }
        },
        error: (error) => { console.log(error); },
      });
    }
  }

  selectImage(e: any, image: Image) {
    console.log(e);
    if (e.ctrlKey || e.shiftKey) {
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

    this.disableSave = this.cardForm.valueChanges.pipe(
      tap(values => { console.log(values) }),
      map(values => (values.alt == this.selectedImages[this.selectedImages.length - 1]?.alternateText && values.description == this.selectedImages[this.selectedImages.length - 1]?.description) ? true : false),
      startWith(true)
    );
  }

  loadMoreImage() {
    this.currentPage = this.currentPage + 1;
    this.getImages({ size: this.tableRows, page: this.currentPage });
  }

  onUpload(fileObject: any) {
    for (let file of fileObject.files) {
      var filesize = +((file.size / 1024) / 1024).toFixed(4); // MB
      if (typeof file.name != "undefined" && filesize <= 10) {
        // this.mediaFrameTabPanel.upload = false;
        // this.mediaFrameTabPanel.library = true;
        this.uploadService.addImage(file).subscribe({
          next: (response) => {
            console.log(response);
            this.selectedIndex = 1;
            this.images.unshift(response);
            this.tableRowsTotal++;
          },
          error: (error) => {
            this.matSnackBar.open('خطا رخ داد', 'بستن', {
              duration: 7000,
              direction: 'rtl',
              panelClass: '',
            });
          }
        });
      } else {
        this.matSnackBar.open('خطا: حجم فایل بیشتر از حد مجاز است', 'بستن', {
          duration: 7000,
          direction: 'rtl',
          panelClass: '',
        });
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
    this.cardForm.setErrors({ 'incorrect': true });
    let temp = this.selectedImages[this.selectedImages.length - 1];
    this.uploadService.editImage({
      "mediaUUID": temp?.mediaUUID,
      "description": this.cardForm.controls['description'].value,
      "categoriesId": temp?.categories,
      "alternateText": this.cardForm.controls['alt'].value
    }).subscribe({
      next: (response) => {
        response.isSelected = true;
        this.images[this.images.findIndex(Element => Element.mediaUUID == temp?.mediaUUID)] = response;
        this.selectedImages[this.selectedImages.findIndex(Element => Element.mediaUUID == temp?.mediaUUID)] = response;
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

  addImage() {
    this.dialogRef.close(this.selectedImages);
  }
}
