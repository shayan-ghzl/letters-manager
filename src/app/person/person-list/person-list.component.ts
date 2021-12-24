import { Component, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { ConfirmDeletePersonComponent } from 'src/app/shared/components/confirm-delete-person/confirm-delete-person.component';
// import { DialogPersonComponent } from 'src/app/shared/components/dialog-person/dialog-person.component';
// import { DialogUploadComponent } from 'src/app/shared/components/dialog-upload/dialog-upload.component';
import { Person, PersonParams } from 'src/app/shared/models/person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent  {

  // @ViewChild(DialogPersonComponent) dialogPersonComponent!: DialogPersonComponent;
  @ViewChild(ConfirmDeletePersonComponent) confirmDeletePersonComponent!: ConfirmDeletePersonComponent;
  // @ViewChild(DialogUploadComponent) dialogUploadComponent!: DialogUploadComponent;
  persons: Person[] = [];
  selectedPerson!: Person;
  columnSortOrder: number | undefined = 0;
  tableRows: number = 10;
  currentPage: number = 0;
  tableRowsTotal!: number;
  tableSort!: string | undefined;
  tableOrder!: number | undefined;
  first = 0;
  searchForm: string = '';
  searchFormTimeout = setTimeout(() => { }, 200);
  keyword!: string;

  constructor(private personService: PersonService, private router: Router) {
    this.getPerson({ size: this.tableRows, page: this.currentPage });
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
      this.getPerson({ size: this.tableRows, page: this.currentPage, keyword: this.keyword, sort: event.field, order: (event.order == 1) ? 'desc' : 'asc' });
      this.first = 0;
    }
  }

  paginate(event: any) {
    this.tableRows = event.rows;
    this.currentPage = event.page;
    this.first = event.first;
    this.getPerson({ size: this.tableRows, page: this.currentPage, keyword: this.keyword, sort: this.tableSort, order: (this.tableOrder == 1) ? 'desc' : 'asc' });
  }

  // updateFromPersonDialog(e: any) {
  //   if (e.status == 'addPerson') {
  //     e.data.isAdded = true;
  //     this.persons.push(e.data);
  //     setTimeout(() => {
  //       e.data.isAdded = false;
  //     }, 1000);
  //   } else {
  //     let theIndex = this.persons.findIndex(p => p.personUUID == e.data.personUUID);
  //     this.persons[theIndex].isEdited = true;
  //     setTimeout(() => {
  //       e.data.isEdited = false;
  //       this.persons[theIndex] = e;
  //       this.selectedPerson = e;
  //     }, 1000);
  //   }
  // }

  updateFromDeletePerson(e: Person) {
    e.isRemoved = true;
    setTimeout(() => {
      let index = this.persons.findIndex(p => p.personUUID == e.personUUID);
      if (index > -1) {
        this.persons.splice(index, 1);
      }
    }, 1000);
  }

  searchFormPerson() {
    this.keyword = this.searchForm;
    clearTimeout(this.searchFormTimeout);
    this.searchFormTimeout = setTimeout(() => {
      this.getPerson({ size: this.tableRows, page: this.currentPage, keyword: this.keyword, sort: this.tableSort, order: (this.tableOrder == 1) ? 'desc' : 'asc' });
    }, 200);
  }

  openPersonEdit(person: Person | null = null) {
    let navigationExtras: NavigationExtras = {
      state: {
        person: person
      }
    };
    this.router.navigate(['person/edit'], navigationExtras);
  }
}