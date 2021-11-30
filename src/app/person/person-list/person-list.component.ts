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
      'validateCondition': '${2 <= this.editPerson_firstname.trim().length && this.editPerson_firstname.trim().length <= 30}'
    },
    'lastName': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      'validateCondition': '${2 <= this.editPerson_lastname.trim().length && this.editPerson_lastname.trim().length <= 30}'
    },
    'fatherName': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      'validateCondition': '${2 <= this.editPerson_father_name.trim().length && this.editPerson_father_name.trim().length <= 30}'
    },
    'nationalID': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      'validateCondition': '${10 == this.editPerson_father_name.trim().length && this.editPerson_father_name.trim().match("[0-9]+")}'
    },
    'certificateNumber': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      'validateCondition': '${0 <= this.editPerson_certificate_number.trim().length && this.editPerson_certificate_number.trim().length <= 12 && this.editPerson_certificate_number.trim().match("[0-9]+")}'
    },
    'fromLocation': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      'validateCondition': '${0 <= this.editPerson_from_location.trim().length && this.editPerson_from_location.trim().length <= 30}'
    },
    'stringBirthDate': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      'validateCondition': '${this.editPerson_string_birth_date.trim().match("^[1-4]\\d{3}\\/((0[1-6]\\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\\/(30|([1-2][0-9])|(0[1-9]))))$")}'
    },
    'address': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      'validateCondition': '${0 <= this.editPerson_address.trim().length && this.editPerson_address.trim().length <= 350}'
    },
    'phoneNumber': {
      'hasError': false,
      'errorMessage': 'مقدار ورودی صحیح نیست',
      'validateCondition': '${11 == this.editPerson_phone_number.trim().length && this.editPerson_phone_number.trim().match("[0-9]+")}',
      'shayan': () => {
        return `${11 == this.editPerson_phone_number.trim().length && this.editPerson_phone_number.trim().match("[0-9]+")}`;
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

  editPersonValidate(e: any) {
    
     console.log(this.editPersonValidateObj.phoneNumber.shayan());
    if (!(2 <= this.editPerson_firstname.trim().length && this.editPerson_firstname.trim().length <= 30)) {
      this.editPersonValidateObj.firstName.hasError = true;
    } else {
      this.editPersonValidateObj.firstName.hasError = false;

    }

  }
}
