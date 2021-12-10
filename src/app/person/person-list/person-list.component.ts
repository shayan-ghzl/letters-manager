import { Component, OnInit, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { ConfirmDeletePersonComponent } from 'src/app/shared/components/confirm-delete-person/confirm-delete-person.component';
import { DialogPersonComponent } from 'src/app/shared/components/dialog-person/dialog-person.component';
import { Person, PersonParams } from 'src/app/shared/models/person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  @ViewChild(DialogPersonComponent) dialogPersonComponent!: DialogPersonComponent;
  @ViewChild(ConfirmDeletePersonComponent) confirmDeletePersonComponent!: ConfirmDeletePersonComponent;
  persons: Person[] = [];
  selectedPerson!: Person;
  columnSortOrder: number | undefined = 0;
  tableRows: number = 10;
  currentPage: number = 0;
  tableRowsTotal!: number;
  tableSort!: string | undefined;
  tableOrder!: number | undefined;

  constructor(private personService: PersonService) {
    this.getPerson({ size: this.tableRows, page: this.currentPage });
  }

  ngOnInit(): void {

  }

  getPerson(params: PersonParams) {
    this.personService.getPersons(params).subscribe(
      (data) => {
        this.tableRowsTotal = data.totalElements;
        this.persons = data.content;
      },
      (error) => { console.log(error); },
      () => { },
    );
  }

  columnSort(event: SortEvent) {
    if (this.columnSortOrder != event.order) {
      this.columnSortOrder = event.order;
      this.tableSort = event.field;
      this.tableOrder = event.order;
      this.currentPage = 0;
      this.getPerson({ size: this.tableRows, page: this.currentPage, sort: event.field, order: (event.order == 1) ? 'asc' : 'desc' });
    }
  }

  paginate(event: any) {
    this.tableRows = event.rows;
    this.currentPage = event.page;
    console.log(this.tableRows);
    console.log(event.page);
    console.log(this.tableSort);
    console.log(this.tableOrder);
    console.log((this.tableOrder == 1) ? 'asc' : 'desc');
    this.getPerson({ size: this.tableRows, page: this.currentPage, sort: this.tableSort, order: (this.tableOrder == 1) ? 'asc' : 'desc' });
  }

  updateFromPersonDialog(e: Person) {
    let theIndex = this.persons.findIndex(p => p.personUUID == e.personUUID);
    this.persons[theIndex].isEdited = true;
    setTimeout(() => {
      e.isEdited = false;
      this.persons[theIndex] = e;
      this.selectedPerson = e;
    }, 1000);
  }

  updateFromDeletePerson(e: Person) {
    e.isRemoved = true;
    setTimeout(() => {
      let index = this.persons.findIndex(p => p.personUUID == e.personUUID);
      if (index > -1) {
        this.persons.splice(index, 1);
      }
    }, 1000);
  }

}