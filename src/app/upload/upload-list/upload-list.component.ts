import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageParams, Image, MediaCategory } from 'src/app/shared/model/model';
import { UploadPreviewDialogContentComponent } from '../upload-preview-dialog-content/upload-preview-dialog-content.component';
import { UploadService } from '../upload.service';


@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent {

  searchField = '';
  images: Image[] = [];
  tableRowsTotal!: number;
  tableRows: number = 10;
  currentPage: number = 0;
  isDone = false;
  showLoading: boolean = false;
  editedMediaIndex = 0;



  constructor(private uploadService: UploadService, private dialog: MatDialog, private matSnackBar: MatSnackBar) {
    this.getImages({ size: this.tableRows, page: this.currentPage });
    this.getCategories();
  }

  // this is for get all media categories 100 by 100 till its end
  categories: MediaCategory[] = [];
  categoriesPage = 0;
  getCategories() {
    this.uploadService.getCategories({ page: this.categoriesPage, size: 100 }).subscribe({
      next: (response) => {
        this.categories = this.categories.concat(response.content);
        if (this.categories.length < response.totalElements) {
          this.categoriesPage++;
          this.getCategories();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getImages(params: ImageParams) {
    if (!this.isDone) {
      this.showLoading = true;
      this.uploadService.getImages(params).subscribe({
        next: (response) => {
          console.log(response.content);
          this.tableRowsTotal = response.totalElements;
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
  loadMoreImage() {
    this.currentPage = this.currentPage + 1;
    this.getImages({ size: this.tableRows, page: this.currentPage });
  }
  openUploadDetailsDialog(image: Image, index: number) {
    this.editedMediaIndex = index;
    // this.uploadDetailsDialogComponent.showUploadDetailsDialog(image);
  }
  imageUpdated(image: Image) {
    this.images[this.editedMediaIndex] = image;
  }

  searchFieldOpration() {
    this.currentPage = 0;
    this.getImages({ keyword: this.searchField, page: this.currentPage, size: this.tableRows });
  }

  onUpload(fileObject: any) {
    for (let file of fileObject.files) {
      var filesize = +((file.size / 1024) / 1024).toFixed(4); // MB
      if (typeof file.name != "undefined" && filesize <= 10) {
        this.uploadService.addImage(file).subscribe({
          next: (response) => {
            this.images.unshift(response);
            this.tableRowsTotal++;
          },
          error: (error) => {
            this.matSnackBar.open(`خطا: ${error.error.message}.`, 'بستن', {
              duration: 7000,
              direction: 'rtl',
              panelClass: '',
            });
          }
        });
      } else {
        this.matSnackBar.open('حجم فایل بیش از حد مجاز است', 'بستن', {
          duration: 7000,
          direction: 'rtl',
          panelClass: '',
        });
      }
    }
  }

  openDialog(element: any) {
    let dialogRef = this.dialog.open(UploadPreviewDialogContentComponent, {
      width: '85%',
      height: '90%',
      data: { element: element, categories: this.categories },
      panelClass: 'app-upload-preview-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uploadService.deleteImage(result.mediaUUID).subscribe({
          next: (response) => {
            result.isRemoved = true;
            setTimeout(() => {
              const index = this.images.indexOf(result);
              if (index > -1) {
                this.images.splice(index, 1);
              }
            }, 1000);
            this.matSnackBar.open(`مورد ${result.position} (${result.name}) حذف گردید.`, 'بستن', {
              duration: 7000,
              direction: 'rtl',
              panelClass: '',
            });
          },
          error: (error) => {
            console.log(error);
            result.isEdited = true;
            setTimeout(() => {
              result.isEdited = false;
            }, 7000);
            this.matSnackBar.open(`خطا: ${error.error.message}.`, 'بستن', {
              duration: 7000,
              direction: 'rtl',
              panelClass: '',
            });
          },
        });
      }
    });
  }
}
