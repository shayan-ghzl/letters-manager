import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  display: boolean = false;

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

  constructor(private personService: PersonService) {
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


  showDialog(person: Person , rowIndex:number) {
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

    this.display = true;
  }
  handleClick(e: any) {

  }
  handleClick2(e: any) {

    this.personService.putPerson(
      {
        personUUID: this.editPerson.personUUID,
        firstName:this.editPerson_firstname,
        lastName:this.editPerson_lastname,
        fatherName:this.editPerson_father_name,
        nationalID:this.editPerson_national_id,
        certificateNumber:this.editPerson_certificate_number,
        fromLocation:this.editPerson_from_location,
        stringBirthDate:this.editPerson_string_birth_date,
        address:this.editPerson_address,
        phoneNumber:this.editPerson_phone_number
      }
    ).subscribe(
      (data) => {
        console.log(data + 'SUCCESS');
      },
      (error) => { console.log(error + ' ERROR'); },
      () => { },
    );
  }


}
