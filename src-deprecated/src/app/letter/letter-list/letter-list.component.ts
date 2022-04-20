import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { PersonService } from 'src/app/person/person.service';
import { Letter, LetterParams } from 'src/app/shared/models/letter';
import { LetterService } from '../letter.service';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.scss']
})
export class LetterListComponent implements OnInit {

  letters: Letter[] = [];
  tableRowsTotal!: number;
  tableRows: number = 10;
  currentPage: number = 0;
  first = 0;
  selectedLetter!: Letter;
  columnSortOrder: number | undefined = 0;
  tableSort!: string | undefined;
  tableOrder!: number | undefined;
  
  constructor(private letterService:LetterService, private personService:PersonService) {
    this.getLetters({ size: this.tableRows, page: this.currentPage });
   }

  ngOnInit(): void {
  }
  getLetters(params: LetterParams) {
    this.letterService.getLetters(params).subscribe(
      (data) => {
        this.tableRowsTotal = data.totalElements;
        this.letters = data.content;
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
      this.getLetters({ size: this.tableRows, page: this.currentPage, sort: event.field, order: (event.order == 1) ? 'desc' : 'asc' });
      this.first = 0;
    }
  }
  
  paginate(event: any) {
    this.tableRows = event.rows;
    this.currentPage = event.page;
    this.first = event.first;
    this.getLetters({ size: this.tableRows, page: this.currentPage, sort: this.tableSort, order: (this.tableOrder == 1) ? 'desc' : 'asc' });
  }
}
