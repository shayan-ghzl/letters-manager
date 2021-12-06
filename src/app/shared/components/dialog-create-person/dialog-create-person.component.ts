import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  MessageService } from 'primeng/api';
import { PersonService } from 'src/app/person/person.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-dialog-create-person',
  templateUrl: './dialog-create-person.component.html',
  styleUrls: ['./dialog-create-person.component.scss']
})
export class DialogCreatePersonComponent implements OnInit {
  
  @Output() update = new EventEmitter<Person>();

  constructor(private personService: PersonService, private messageService: MessageService) { }

  ngOnInit(): void {
  }
  // clear() {
  //   this.messageService.clear('dialogCreatePersonToast');
  // }
  // addNewPersonDialog() {
   
   
  //   this.editPersonRowIndex =  1;
  //   this.editPerson_firstname = '';
  //   this.editPerson_lastname = '';
  //   this.editPerson_father_name = '';
  //   this.editPerson_national_id = '';
  //   this.editPerson_certificate_number = '';
  //   this.editPerson_from_location = '';
  //   this.editPerson_string_birth_date = '';
  //   this.editPerson_address = '';
  //   this.editPerson_phone_number = '';

  //   this.DialogEditPerson = true;
  // }

  // hideDialog() {
  //   for (const [key, value] of Object.entries(this.editPersonValidateObj)) {
  //     value.hasError = false;
  //   }
  // } 
}
