import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Person } from '../models/person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  DialogEditPerson: boolean = false;
  displayDialogSpinner: boolean = false;
  displaySubmitBtn: boolean = true;

  persons: Person[] = [];

  editPerson_firstname: string = '';
  editPerson_lastname: string = '';
  editPerson_father_name: string = '';
  editPerson_national_id: string = '';
  editPerson_certificate_number: string = '';
  editPerson_from_location: string = '';
  editPerson_string_birth_date: string = '';
  editPerson_address: string = '';
  editPerson_phone_number: string = '';

  editPerson!: Person;
  editPersonRowIndex!: number;

  editPersonValidateObj = {
    'firstName': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      isValid: () => {
        let temp = this.editPerson_firstname.trim().length;
        return (2 <= temp && temp <= 30);
      }
    },
    'lastName': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      isValid: () => {
        let temp = this.editPerson_lastname.trim().length;
        return (2 <= temp && temp <= 30);
      }
    },
    'fatherName': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      isValid: () => {
        let temp = this.editPerson_father_name.trim().length;
        return (2 <= temp && temp <= 30);
      }
    },
    'nationalID': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      isValid: () => {
        let temp = this.editPerson_national_id.trim();
        return (10 == temp.length && temp.match("[0-9]+") != null);
      }
    },
    'certificateNumber': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      isValid: () => {
        let temp = this.editPerson_certificate_number.trim();
        return (0 <= temp.length && temp.length <= 12 && temp.match("[0-9]+") != null);
      }
    },
    'fromLocation': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      isValid: () => {
        let temp = this.editPerson_from_location.trim().length;
        return (0 <= temp && temp <= 30);
      }
    },
    'stringBirthDate': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      isValid: () => {
        return (this.editPerson_string_birth_date.trim().match("^[1-4]\\d{3}\\/((0[1-6]\\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\\/(30|([1-2][0-9])|(0[1-9]))))$") != null);
      }
    },
    'address': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      isValid: () => {
        let temp = this.editPerson_address.trim().length;
        return (0 <= temp && temp <= 350);
      }
    },
    'phoneNumber': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      isValid: () => {
        let temp = this.editPerson_phone_number.trim();
        return (11 == temp.length && temp.match("[0-9]+") != null);
      }
    },
  };

  constructor(private personService: PersonService, private messageService: MessageService) {
    this.personService.getPersons().subscribe(
      (data) => {
        this.persons = data;
      },
      (error) => { console.log(error); },
      () => { },
    );
  }

  ngOnInit(): void {

  }

  clear() {
    this.messageService.clear('personEditResult');
  }

  showDialog(person: Person, rowIndex: number) {
    this.editPerson = person;
    this.editPersonRowIndex = rowIndex + 1;
    this.editPerson_firstname = person.firstName;
    this.editPerson_lastname = person.lastName;
    this.editPerson_father_name = person.fatherName;
    this.editPerson_national_id = person.nationalID;
    this.editPerson_certificate_number = person.certificateNumber;
    this.editPerson_from_location = person.fromLocation;
    this.editPerson_string_birth_date = person.stringBirthDate;
    this.editPerson_address = person.address;
    this.editPerson_phone_number = person.phoneNumber;

    this.DialogEditPerson = true;
  }
  handleClick(e: any) {

  }
  editPersonSubmit() {
    if (this.editPersonValidate('allFields')) {
      this.displaySubmitBtn = true;
      this.displayDialogSpinner = true;
      this.personService.putPerson(
        {
          personUUID: this.editPerson.personUUID,
          firstName: this.editPerson_firstname,
          lastName: this.editPerson_lastname,
          fatherName: this.editPerson_father_name,
          nationalID: this.editPerson_national_id,
          certificateNumber: this.editPerson_certificate_number,
          fromLocation: this.editPerson_from_location,
          stringBirthDate: this.editPerson_string_birth_date,
          address: this.editPerson_address,
          phoneNumber: this.editPerson_phone_number
        }
      ).subscribe(
        (data) => {
          console.log(data);
          this.messageService.add({ key: 'personEditResult', severity: 'success', summary: 'موفقیت آمیز', detail: `ردیف ${this.editPersonRowIndex} ویرایش شد.`, life: 7000 });
        },
        (error) => {
          console.log(error);
          this.messageService.add({ key: 'personEditResult', severity: 'error', summary: 'خطا', detail: 'خطا رخ داد.', life: 7000 });
          this.DialogEditPerson = false;
          this.displayDialogSpinner = false;
        },
        () => {
          this.DialogEditPerson = false;
          this.displayDialogSpinner = false;
        },
      );
    }
  }

  editPersonValidate(fieldName: string): boolean {

    switch (fieldName) {
      case 'firstName':
        if (this.editPersonValidateObj.firstName.isValid()) {
          this.editPersonValidateObj.firstName.hasError = false;
          this.displaySubmitBtn = false;
          return true;
        } else {
          this.editPersonValidateObj.firstName.hasError = true;
          this.displaySubmitBtn = true;
          return false;
        }
        break;
      case 'lastName':
        if (this.editPersonValidateObj.lastName.isValid()) {
          this.editPersonValidateObj.lastName.hasError = false;
          this.displaySubmitBtn = false;
          return true;
        } else {
          this.editPersonValidateObj.lastName.hasError = true;
          this.displaySubmitBtn = true;
          return false;
        }
        break;
      case 'fatherName':
        if (this.editPersonValidateObj.fatherName.isValid()) {
          this.editPersonValidateObj.fatherName.hasError = false;
          this.displaySubmitBtn = false;
          return true;
        } else {
          this.editPersonValidateObj.fatherName.hasError = true;
          this.displaySubmitBtn = true;
          return false;
        }
        break;
      case 'nationalID':
        if (this.editPersonValidateObj.nationalID.isValid()) {
          this.editPersonValidateObj.nationalID.hasError = false;
          this.displaySubmitBtn = false;
          return true;
        } else {
          this.editPersonValidateObj.nationalID.hasError = true;
          this.displaySubmitBtn = true;
          return false;
        }
        break;
      case 'certificateNumber':
        if (this.editPersonValidateObj.certificateNumber.isValid()) {
          this.editPersonValidateObj.certificateNumber.hasError = false;
          this.displaySubmitBtn = false;
          return true;
        } else {
          this.editPersonValidateObj.certificateNumber.hasError = true;
          this.displaySubmitBtn = true;
          return false;
        }
        break;
      case 'fromLocation':
        if (this.editPersonValidateObj.fromLocation.isValid()) {
          this.editPersonValidateObj.fromLocation.hasError = false;
          this.displaySubmitBtn = false;
          return true;
        } else {
          this.editPersonValidateObj.fromLocation.hasError = true;
          this.displaySubmitBtn = true;
          return false;
        }
        break;
      case 'stringBirthDate':
        if (this.editPersonValidateObj.stringBirthDate.isValid()) {
          this.editPersonValidateObj.stringBirthDate.hasError = false;
          this.displaySubmitBtn = false;
          return true;
        } else {
          this.editPersonValidateObj.stringBirthDate.hasError = true;
          this.displaySubmitBtn = true;
          return false;
        }
        break;
      case 'address':
        if (this.editPersonValidateObj.address.isValid()) {
          this.editPersonValidateObj.address.hasError = false;
          this.displaySubmitBtn = false;
          return true;
        } else {
          this.editPersonValidateObj.address.hasError = true;
          this.displaySubmitBtn = true;
          return false;
        }
        break;
      case 'phoneNumber':
        if (this.editPersonValidateObj.phoneNumber.isValid()) {
          this.editPersonValidateObj.phoneNumber.hasError = false;
          this.displaySubmitBtn = false;
          return true;
        } else {
          this.editPersonValidateObj.phoneNumber.hasError = true;
          this.displaySubmitBtn = true;
          return false;
        }
        break;
      default:
        let isFormValid: boolean = true;
        if (this.editPersonValidateObj.firstName.isValid()) {
          this.editPersonValidateObj.firstName.hasError = false;
          isFormValid = true;
        } else {
          this.editPersonValidateObj.firstName.hasError = true;
          isFormValid = false;
        }
        if (this.editPersonValidateObj.lastName.isValid()) {
          this.editPersonValidateObj.lastName.hasError = false;
          isFormValid = true;
        } else {
          this.editPersonValidateObj.lastName.hasError = true;
          isFormValid = false;
        }
        if (this.editPersonValidateObj.fatherName.isValid()) {
          this.editPersonValidateObj.fatherName.hasError = false;
          isFormValid = true;
        } else {
          this.editPersonValidateObj.fatherName.hasError = true;
          isFormValid = false;
        }
        if (this.editPersonValidateObj.nationalID.isValid()) {
          this.editPersonValidateObj.nationalID.hasError = false;
          isFormValid = true;
        } else {
          this.editPersonValidateObj.nationalID.hasError = true;
          isFormValid = false;
        }
        if (this.editPersonValidateObj.certificateNumber.isValid()) {
          this.editPersonValidateObj.certificateNumber.hasError = false;
          isFormValid = true;
        } else {
          this.editPersonValidateObj.certificateNumber.hasError = true;
          isFormValid = false;
        }
        if (this.editPersonValidateObj.fromLocation.isValid()) {
          this.editPersonValidateObj.fromLocation.hasError = false;
          isFormValid = true;
        } else {
          this.editPersonValidateObj.fromLocation.hasError = true;
          isFormValid = false;
        }
        if (this.editPersonValidateObj.stringBirthDate.isValid()) {
          this.editPersonValidateObj.stringBirthDate.hasError = false;
          isFormValid = true;
        } else {
          this.editPersonValidateObj.stringBirthDate.hasError = true;
          isFormValid = false;
        }
        if (this.editPersonValidateObj.address.isValid()) {
          this.editPersonValidateObj.address.hasError = false;
          isFormValid = true;
        } else {
          this.editPersonValidateObj.address.hasError = true;
          isFormValid = false;
        }
        if (this.editPersonValidateObj.phoneNumber.isValid()) {
          this.editPersonValidateObj.phoneNumber.hasError = false;
          isFormValid = true;
        } else {
          this.editPersonValidateObj.phoneNumber.hasError = true;
          isFormValid = false;
        }
        this.displaySubmitBtn = !isFormValid;
        return isFormValid;
        break;
    }

  }
  preventPaste(e: any) {
    e.preventDefault();
    return false;
  }
  onlyNumbersAllowed(e: KeyboardEvent) {
    // var codeKey = e.keyCode;
    // if (!((codeKey >= 48 && codeKey <= 57) || (codeKey >= 96 && codeKey <= 105) || codeKey == 8)) {
    //     e.preventDefault();
    //     return false;
    // }
    // codeKey != 8
    // (this.input.value.length == 0 && (codeKey == 96 || codeKey == 48 || codeKey == 97 || codeKey == 49)) || (this.input.value.length == 2 && +(this.input.value[0]) == 1 && codeKey == 8)
  }
  // setInputFilter(textbox: Element, inputFilter: (value: string) => boolean): void {
  //   ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
  //     textbox.addEventListener(event, function (this: (HTMLInputElement | HTMLTextAreaElement) & { oldValue: string; oldSelectionStart: number | null, oldSelectionEnd: number | null }) {
  //       if (inputFilter(this.value)) {
  //         this.oldValue = this.value;
  //         this.oldSelectionStart = this.selectionStart;
  //         this.oldSelectionEnd = this.selectionEnd;
  //       } else if (Object.prototype.hasOwnProperty.call(this, 'oldValue')) {
  //         this.value = this.oldValue;
  //         if (this.oldSelectionStart !== null && this.oldSelectionEnd !== null) {
  //           this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
  //         }
  //       } else {
  //         this.value = "";
  //       }
  //     });
  //   });
  // }
  // setInputFilter(document.getElementById("myTextBox"), function(value) {
  //   return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
  // });
}
