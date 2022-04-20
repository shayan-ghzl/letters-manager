import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterListComponent } from './letter-list/letter-list.component';
import { PersonRoutingModule } from './letter-routing.module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [
    LetterListComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
  ]
})
export class LetterModule { }
