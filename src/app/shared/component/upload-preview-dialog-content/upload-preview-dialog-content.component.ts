import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, Observable, startWith, tap } from 'rxjs';
import { RemoveConfirmationDialogContentComponent } from 'src/app/shared/component/remove-confirmation-dialog-content/remove-confirmation-dialog-content.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaCategory } from 'src/app/shared/model/model';
import { UploadService } from 'src/app/upload/upload.service';

@Component({
  selector: 'app-upload-preview-dialog-content',
  templateUrl: './upload-preview-dialog-content.component.html',
  styleUrls: ['./upload-preview-dialog-content.component.scss']
})
export class UploadPreviewDialogContentComponent {

  // if formControl is disabled Validators does not work
  cardForm = new FormGroup({
    alt: new FormControl(this.data.element.alternateText, [Validators.maxLength(30)]),
    description: new FormControl(this.data.element.description, [Validators.maxLength(30)]),
    category: new FormControl([]),
  });

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredCategories: Observable<MediaCategory[]>;
  selectedCategories: MediaCategory[] = this.data.element.categories;;
  allCategories: MediaCategory[] = this.data.categories;
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  disableSave!: Observable<boolean>;
  constructor(
    public dialogRef: MatDialogRef<UploadPreviewDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private matSnackBar: MatSnackBar, private uploadService: UploadService
  ) {
    this.filteredCategories = this.cardForm.controls['category'].valueChanges.pipe(
      startWith(null),
      map((fieldValue: string | null) => (fieldValue ? this._filter(fieldValue) : this.allCategories.slice())),
    );
    this.disableSave = this.cardForm.valueChanges.pipe(
      // tap(values => {console.log(values)}),
      map(values => (values.alt == this.data.element.alternateText && values.description == this.data.element.description) ? true : false),
      startWith(true)
    );
  }

  // (matChipInputTokenEnd)="add($event)"
  // add(event: MatChipInputEvent): void {
  //   event.chipInput!.clear();
  //   this.cardForm.controls['category'].setValue(null);
  // }

  remove(category: MediaCategory): void {
    const index = this.selectedCategories.indexOf(category);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // console.log(this.selectedCategories,'selected');
    if (this.selectedCategories.indexOf(event.option.value) == -1)
      this.selectedCategories.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    // this.cardForm.controls['category'].setValue(null);
  }

  private _filter(value: string | MediaCategory): MediaCategory[] {
    let filterValue: string;
    if (typeof value == 'string') {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.name;
    }
    return this.allCategories.filter(mediaCategory => mediaCategory.name.toLowerCase().includes(filterValue));
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
    // console.log(this.cardForm.controls['category'].valid, 'this.cardForm.controls.valid');
    // console.log(this.selectedCategories, 'selectedCategories');
    this.cardForm.setErrors({'incorrect': true});
    let temp: string[] = [];
    this.selectedCategories.forEach((Element) => {
      temp.push(Element.categoryUUID);
    });
    this.uploadService.editImage({
      "mediaUUID": this.data.element.mediaUUID,
      "description": this.cardForm.controls['description'].value,
      "categoriesId": temp,
      "alternateText": this.cardForm.controls['alt'].value
    }).subscribe({
      next: (response) => {
        // console.log(response);
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
