import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Person, PersonParams } from 'src/app/shared/models/person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  persons: Person[] = [];
  selectedPerson!: Person;
  customSortOrder: number | undefined = 0;
  tableRows: number = 2;
  tableRowsTotal!: number;
  tableSort!: string | undefined;
  tableOrder!: number | undefined;

  constructor(private personService: PersonService) {
    this.getPerson({ size: this.tableRows, page: 0 });
  }

  ngOnInit(): void {

  }

  getPerson(params: PersonParams) {
    this.personService.getPersons(params).subscribe(
      (data) => {
        this.tableRowsTotal = data.totalPages;
        this.persons = data.content;
      },
      (error) => { console.log(error); },
      () => { },
    );
  }

  customSort(event: SortEvent) {
    if (this.customSortOrder != event.order) {
      this.customSortOrder = event.order;
      this.tableSort = event.field;
      this.tableOrder = event.order;
      this.getPerson({ size: this.tableRows, page: 0, sort: event.field, order: (event.order == 1) ? 'asc' : 'desc' });
    }
  }

  paginate(event: any) {
    this.tableRows = event.rows;
    console.log(this.tableRows);
    console.log(event.page);
    console.log(this.tableSort);
    console.log(this.tableOrder);
    console.log((this.tableOrder == 1) ? 'asc' : 'desc');
    this.getPerson({ size: this.tableRows, page: event.page, sort: this.tableSort, order: (this.tableOrder == 1) ? 'asc' : 'desc' });
  }

  updateFromEditPerson(e: Person) {
    this.persons[this.persons.findIndex(p => p.personUUID == e.personUUID)] = e;
    this.selectedPerson = e;
  }

  updateFromDeletePerson(e: Person) {
    this.selectedPerson = e;
    e.isRemoved = true;
    setTimeout(() => {
      let index = this.persons.findIndex(p => p.personUUID == e.personUUID);
      if (index > -1) {
        this.persons.splice(index, 1);
      }
    }, 1000);
  }

  updateFromCreatePerson(e: Person) {

  }

}