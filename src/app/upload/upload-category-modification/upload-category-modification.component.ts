import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-upload-category-modification',
  templateUrl: './upload-category-modification.component.html',
  styleUrls: ['./upload-category-modification.component.scss']
})
export class UploadCategoryModificationComponent {
  // if formControl is disabled Validators does not work
  cardForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    fathername: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    nationalId: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1000000000), Validators.max(9999999999)]),
    certificateNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(999999999999)]),
    fromLocation: new FormControl(''),
    stringBirthDate: new FormControl('', [Validators.required, Validators.pattern("^[1-4]\\d{3}\\/((0[1-6]\\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\\/(30|([1-2][0-9])|(0[1-9]))))$")]),
    address: new FormControl(''),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(99999999999)]),
  });

  constructor() { }

  changeHandler() {
    // same
    console.log(this.cardForm.get('firstname'));
    console.log(this.cardForm.controls['firstname']);

    // status
    console.log(this.cardForm.controls['firstname'].touched);
    console.log(this.cardForm.controls['firstname'].valid);
    console.log(this.cardForm.controls['firstname'].invalid);
    console.log(this.cardForm.controls['firstname'].pristine);
    console.log(this.cardForm.controls['firstname'].dirty);
    console.log(this.cardForm.controls['firstname'].disabled);
    console.log(this.cardForm.controls['firstname'].errors);
  }

}
