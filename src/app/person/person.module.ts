import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonRoutingModule } from './person-routing.module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from '../shared/shared.module';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonEditComponent,
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    SharedModule,
    ToastModule,
    
  ],
  providers: [

  ]
})
export class PersonModule { }
