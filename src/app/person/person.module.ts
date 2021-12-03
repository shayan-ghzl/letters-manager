import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonRoutingModule } from './person-routing.module';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    PersonListComponent,
    OnlyNumbersDirective
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    PaginatorModule

  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PersonModule { }
