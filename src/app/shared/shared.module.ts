import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcVmAccordionComponent } from './components/ac-vm-accordion/ac-vm-accordion.component';
import { SubAccordionGroupComponent } from './components/ac-vm-accordion/sub-accordion-group/sub-accordion-group.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDeletePersonComponent } from './components/confirm-delete-person/confirm-delete-person.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { RouterModule } from '@angular/router';
import { DialogPersonComponent } from './components/dialog-person/dialog-person.component';

@NgModule({
  declarations: [
    AcVmAccordionComponent,
    SubAccordionGroupComponent,
    OnlyNumbersDirective,
    ConfirmDeletePersonComponent,
    DialogPersonComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
    AccordionModule.forRoot(),
    RouterModule,
  ],
  exports: [
    AcVmAccordionComponent,
    OnlyNumbersDirective,
    ConfirmDeletePersonComponent,
    DialogPersonComponent
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class SharedModule { }
