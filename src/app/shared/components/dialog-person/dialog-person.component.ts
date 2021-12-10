import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PersonService } from 'src/app/person/person.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-dialog-person',
  templateUrl: './dialog-person.component.html',
  styleUrls: ['./dialog-person.component.scss']
})
export class DialogPersonComponent implements OnInit {

  @Output() update = new EventEmitter<any>();

  DialogPerson: boolean = false;
  displayDialogSpinner: boolean = false;
  displaySubmitBtn: boolean = true;
  dialogTitle = '';
  dialogStatus = 'addPerson';

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
      'isRequired': true,
      'hasError': false,
      'errorMessage': 'بین 2 تا 30 حرف مجاز است',
      isValid: () => {
        let temp = this.editPerson_firstname.trim().length;
        return (2 <= temp && temp <= 30);
      }
    },
    'lastName': {
      'isRequired': true,
      'hasError': false,
      'errorMessage': 'بین 2 تا 30 حرف مجاز است',
      isValid: () => {
        let temp = this.editPerson_lastname.trim().length;
        return (2 <= temp && temp <= 30);
      }
    },
    'fatherName': {
      'isRequired': true,
      'hasError': false,
      'errorMessage': 'بین 2 تا 30 حرف مجاز است',
      isValid: () => {
        let temp = this.editPerson_father_name.trim().length;
        return (2 <= temp && temp <= 30);
      }
    },
    'nationalID': {
      'isRequired': true,
      'hasError': false,
      'errorMessage': '10 رقم مجاز است',
      isValid: () => {
        let temp = this.editPerson_national_id.trim();
        return (10 == temp.length && temp.match("[0-9]+") != null);
      }
    },
    'certificateNumber': {
      'isRequired': true,
      'hasError': false,
      'errorMessage': 'بیش از 12 رقم مجاز نیست',
      isValid: () => {
        let temp = this.editPerson_certificate_number.trim();
        return ( temp.length <= 12 && temp.match("[0-9]+") != null);
      }
    },
    'fromLocation': {
      'isRequired': false,
      'hasError': false,
      'errorMessage': 'بیش از 30 حرف مجاز نیست',
      isValid: () => {
        let temp = this.editPerson_from_location.trim().length;
        return (temp <= 30);
      }
    },
    'stringBirthDate': {
      'isRequired': true,
      'hasError': false,
      'errorMessage': 'xxxx/xx/xx فرمت مجاز می باشد',
      isValid: () => {
        return (this.editPerson_string_birth_date.trim().match("^[1-4]\\d{3}\\/((0[1-6]\\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\\/(30|([1-2][0-9])|(0[1-9]))))$") != null);
      }
    },
    'address': {
      'isRequired': false,
      'hasError': false,
      'errorMessage': 'بیش از 350 حرف مجاز نیست',
      isValid: () => {
        let temp = this.editPerson_address.trim().length;
        return (temp <= 350);
      }
    },
    'phoneNumber': {
      'isRequired': true,
      'hasError': false,
      'errorMessage': '11 رقم مجاز است',
      isValid: () => {
        let temp = this.editPerson_phone_number.trim();
        return (11 == temp.length && temp.match("[0-9]+") != null);
      }
    },
  };

  constructor(private personService: PersonService, private messageService: MessageService) { }

  ngOnInit(): void {
  }
  clear() {
    this.messageService.clear('DialogPersonToast');
  }
  showPersonDialog(person: Person | null = null, rowIndex: number = 1): void | boolean {
    if (person) {
      if (person.isRemoved || person.isEdited) {
        return false;
      }
      this.dialogStatus = 'editPerson';
      this.editPerson = person;
      this.editPersonRowIndex = rowIndex;
      this.dialogTitle = `ویرایش ردیف ${rowIndex}`;
      this.editPerson_firstname = person.firstName;
      this.editPerson_lastname = person.lastName;
      this.editPerson_father_name = person.fatherName;
      this.editPerson_national_id = person.nationalID;
      this.editPerson_certificate_number = person.certificateNumber;
      this.editPerson_from_location = person.fromLocation;
      this.editPerson_string_birth_date = person.stringBirthDate;
      this.editPerson_address = person.address;
      this.editPerson_phone_number = person.phoneNumber;
    } else {
      this.dialogStatus = 'addPerson';
      this.dialogTitle = 'افزودن جدید';
      this.editPerson_firstname = '';
      this.editPerson_lastname = '';
      this.editPerson_father_name = '';
      this.editPerson_national_id = '';
      this.editPerson_certificate_number = '';
      this.editPerson_from_location = '';
      this.editPerson_string_birth_date = '';
      this.editPerson_address = '';
      this.editPerson_phone_number = '';
      this.editPersonValidate('allFields');
    }
    this.DialogPerson = true;
  }
  dialogPersonSubmit(status = 'editPerson') {

    if (this.editPersonValidate('allFields')) {
      this.displaySubmitBtn = true;
      this.displayDialogSpinner = true;
      if (status == 'editPerson') {
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
            this.update.emit({ 'data': data, 'status': status });
            this.messageService.add({ key: 'DialogPersonToast', severity: 'success', summary: 'موفقیت آمیز', detail: `ردیف ${this.editPersonRowIndex} ویرایش شد.`, life: 7000 });
          },
          (error) => {
            console.log(error);
            this.messageService.add({ key: 'DialogPersonToast', severity: 'error', summary: 'خطا', detail: 'خطا رخ داد.', life: 7000 });
            this.DialogPerson = false;
            this.displayDialogSpinner = false;
          },
          () => {
            this.DialogPerson = false;
            this.displayDialogSpinner = false;
          },
        );
      } else {
        this.personService.addPerson(
          {
            personUUID: '',
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
            this.update.emit({ 'data': data, 'status': status });
            this.messageService.add({ key: 'DialogPersonToast', severity: 'success', summary: 'موفقیت آمیز', detail: `ردیف جدید افزوده شد.`, life: 7000 });
          },
          (error) => {
            console.log(error);
            this.messageService.add({ key: 'DialogPersonToast', severity: 'error', summary: 'خطا', detail: 'خطا رخ داد.', life: 7000 });
            this.DialogPerson = false;
            this.displayDialogSpinner = false;
          },
          () => {
            this.DialogPerson = false;
            this.displayDialogSpinner = false;
          },
        );
      }
    }

  }

  editPersonValidate(fieldName: string): boolean {

    switch (fieldName) {
      case 'firstName':
        if (this.editPersonValidateObj.firstName.isValid()) {
          this.editPersonValidateObj.firstName.hasError = false;

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

          return true;
        } else {
          this.editPersonValidateObj.phoneNumber.hasError = true;
          this.displaySubmitBtn = true;
          return false;
        }
        break;
      default:
        let isFormValid: number = 0;
        for (const [key, value] of Object.entries(this.editPersonValidateObj)) {
          if (value.isValid()) {
            value.hasError = false;
            isFormValid++;
          } else {
            value.hasError = true;
            isFormValid--;
          }
        }
        if (Object.entries(this.editPersonValidateObj).length == isFormValid) {
          this.displaySubmitBtn = false;
          return true;
        } else {
          this.displaySubmitBtn = true;
          return false;
        }
        break;
    }

  }
  hideDialog() {
    for (const [key, value] of Object.entries(this.editPersonValidateObj)) {
      value.hasError = false;
    }
  }

}
