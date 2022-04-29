import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith, Subscription, tap } from 'rxjs';
import { UploadService } from 'src/app/upload/upload.service';
import { environment } from 'src/environments/environment';
import { AppMatSelectOptionLabel, CardFormControls, SelectSearchAdd } from '../../model/model';
import { UploadSelectDialogContentComponent } from '../upload-select-dialog-content/upload-select-dialog-content.component';
import { Image } from '../../model/model';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-modification-form',
  templateUrl: './modification-form.component.html',
  styleUrls: ['./modification-form.component.scss']
})
export class ModificationFormComponent implements OnInit {

  currentObject!: any;
  @Input() formTitle: string[] = [];
  // used in add dialogs
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Input() backRouter = '';
  @Input() fieldStyle: MatFormFieldAppearance = 'fill';
  @Input() requestRoute = '';
  @Input() idAttributeKey = '';
  @Input() cardFormControls: CardFormControls[] = [];
  cardForm!: FormGroup;
  optionLabels: AppMatSelectOptionLabel[] = [];

  // disableSave!: Observable<boolean>;
  // || (disableSave | async)

  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog, private matSnackBar: MatSnackBar, private http: HttpClient, private uploadService: UploadService) {

  }

  ngOnInit(): void {
    let formGroupObject: any = {};
    this.cardFormControls.forEach((Element) => {
      let temp = [];
      for (const [key, value] of Object.entries(Element.validation)) {
        switch (key) {
          case 'isRequired':
            if (value) {
              temp.push(Validators.required);
            }
            break;
          case 'minLength':
            temp.push(Validators.minLength(<number>value));
            break;
          case 'maxLength':
            temp.push(Validators.maxLength(<number>value));
            break;
          case 'pattern':
            temp.push(Validators.pattern(<string>value));
            break;
          default:
            break;
        }
      }
      if (Element.field.type == 'imagePicker') {
        formGroupObject[Element.formControlName] = new FormControl([], temp);
      } else {
        formGroupObject[Element.formControlName] = new FormControl('', temp);
      }
    });
    this.cardForm = new FormGroup(formGroupObject);
    let isEditMood = this.activatedRoute.snapshot.queryParams['ob'];
    if (isEditMood) {
      this.http.get<any>(environment.apiUrl + this.requestRoute + '/' + isEditMood).subscribe({
        next: (response) => {
          console.log(response, 'currentObject');
          this.cardFormControls.forEach((Element) => {
            if (Element.field.type == 'select' || Element.field.type == 'imagePicker') {
              this.cardForm.controls[Element.formControlName].setValue(response[Element.field.objectAttribute]);
            } else {
              this.cardForm.controls[Element.formControlName].setValue(response[Element.formControlName]);
            }
          });
          this.currentObject = response;
          this.formTitle[0] = 'ویرایش'
          // this.cardForm.setErrors({ 'incorrect': true });
        },
        error: (error) => {
          console.log(error);
        },
      });
      // this.disableSave = this.cardForm.valueChanges.pipe(
      //   tap(values => { console.log(values) }),
      //   map(values => {
      //     let counter = 0;
      //     this.cardFormControls.forEach((Element) => {
      //       if (Element.field.type == 'select' || Element.field.type == 'imagePicker') {
      //         console.log('imagePicker');
      //         if (values[Element.formControlName] == this.currentObject[Element.field.objectAttribute]) {
      //           counter++;
      //         }
      //       } else {
      //         if (values[Element.formControlName] == this.currentObject[Element.formControlName]) {
      //           counter++;
      //         }
      //       }
      //     });
      //     if (Object.keys(this.cardForm.controls).length == counter) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   }),
      //   startWith(true)
      // );
    }

  }
  // removeAttache(index: number, formControlName: string) {
  //   this.cardForm.controls[formControlName].value.splice(index, 1);
  // }
  openDialog(cardFormControl: any) {
    let selectedImage = this.cardForm.controls[cardFormControl.formControlName].value;
    let dialogRef = this.dialog.open(cardFormControl.field.openAddDialog, {
      width: '85%',
      height: '90%',
      data: { element: this.currentObject, selectedImage: selectedImage },
      panelClass: 'app-upload-select-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (Array.isArray(result)) {
        result.forEach((Element) => {
          if (!selectedImage.filter((p: Image) => p.mediaUUID == Element.mediaUUID).length) {
            // this.cardForm.controls[cardFormControl.formControlName].value.push(Element);
            let temp = this.cardForm.controls[cardFormControl.formControlName].value;
            temp.push(Element);
            this.cardForm.controls[cardFormControl.formControlName].setValue(temp);
          }
        });
        console.log(result, 'delete image');
      } else if (result) {
        this.uploadService.deleteImage(result.mediaUUID).subscribe({
          next: (response: any) => {
            this.matSnackBar.open(`مورد ${result.position} (${result.name}) حذف گردید.`, 'بستن', {
              duration: 7000,
              direction: 'rtl',
              panelClass: '',
            });
          },
          error: (error: any) => {
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

  submitHandler() {
    this.cardForm.setErrors({ 'incorrect': true });
    let modificationObject: any = {};
    modificationObject[this.idAttributeKey] = (this.currentObject) ? this.currentObject[this.idAttributeKey] : null;
    this.cardFormControls.forEach((Element) => {
      if (Element.field.type == 'imagePicker') {
        modificationObject[Element.formControlName] = this.cardForm.controls[Element.formControlName].value.map((value: Image) => value.mediaUUID);
      } else {
        modificationObject[Element.formControlName] = this.cardForm.controls[Element.formControlName].value;
      }
    });
    this.modificationMood(modificationObject).subscribe({
      next: (response: any) => {
        console.log(response);
        this.update.emit(response);
        this.matSnackBar.open(`با موفقیت اضافه شد`, 'بستن', {
          duration: 7000,
          direction: 'rtl',
          panelClass: '',
        });
      },
      error: (error: any) => {
        console.log(error);
        this.matSnackBar.open(`خطا: ${error.error.message}.`, 'بستن', {
          duration: 7000,
          direction: 'rtl',
          panelClass: '',
        });
      },
    })
      ;
  }

  modificationMood(object: any): Observable<any> {
    console.log(object);
    if (object[this.idAttributeKey]) {
      return this.http.put<any>(environment.apiUrl + this.requestRoute, object);
    } else {
      return this.http.post<any>(environment.apiUrl + this.requestRoute, object);
    }
  }

  updateObjects(e: Observable<any>) {
    e.subscribe((res) => {
      // this.modificationObject[Object.keys(res)[0]] = res[Object.keys(res)[0]];
      console.log(res);
      this.cardForm.controls[Object.keys(res)[0]].setValue(res[Object.keys(res)[0]]);
    });
  }
}