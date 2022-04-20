import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardFormControls } from '../../model/model';
import { UploadSelectDialogContentComponent } from '../upload-select-dialog-content/upload-select-dialog-content.component';

@Component({
  selector: 'app-modification-form',
  templateUrl: './modification-form.component.html',
  styleUrls: ['./modification-form.component.scss']
})
export class ModificationFormComponent implements OnInit {

  currentObject!: any;
  @Input() formTitle: string[] = [];
  @Input() requestRoute = '';
  @Input() idAttributeKey = '';
  @Input() cardFormControls: CardFormControls[] = [];
  cardForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog, private matSnackBar: MatSnackBar, private http: HttpClient) { }

  ngOnInit(): void {
    let isEditMood = this.activatedRoute.snapshot.queryParams['ob'];
    if (isEditMood) {
      this.http.get<any>(environment.apiUrl + this.requestRoute + '/' + isEditMood).subscribe({
        next: (response) => {
          console.log(response, 'currentObject');
          this.currentObject = response;
          this.cardFormControls.forEach((Element) => {
            this.cardForm.controls[Element.formControlName].setValue(response[Element.formControlName]);
          });
          this.formTitle[0] = 'ویرایش'
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
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
      formGroupObject[Element.formControlName] = new FormControl('', temp);
    });
    this.cardForm = new FormGroup(formGroupObject);
  }

  openDialog() {
    let dialogRef = this.dialog.open(UploadSelectDialogContentComponent, {
      width: '85%',
      height: '90%',
      data: { element: this.currentObject },
      panelClass: 'app-upload-select-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  submitHandler() {
    let modificationObject: any = {};
    this.cardFormControls.forEach((Element) => {
      modificationObject[Element.formControlName] = this.cardForm.controls[Element.formControlName].value;
    });
    this.modificationMood({
      ...modificationObject,
      customerUUID: this.currentObject?.customerUUID,
      medias: []
    }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.matSnackBar.open(`hello`, 'بستن', {
          duration: 7000,
          direction: 'rtl',
          panelClass: '',
        });
      },
      error: (error: any) => {
        console.log(error);
        this.matSnackBar.open(`hello`, 'بستن', {
          duration: 7000,
          direction: 'rtl',
          panelClass: '',
        });
      },
    })
      ;
  }

  modificationMood(object: any): Observable<any> {
    if (object[this.idAttributeKey]) {
      return this.http.put<any>(environment.apiUrl + this.requestRoute, object);
    } else {
      return this.http.post<any>(environment.apiUrl + this.requestRoute, object);
    }
  }

}