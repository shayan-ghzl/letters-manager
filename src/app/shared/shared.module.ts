import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcVmAccordionComponent } from './components/ac-vm-accordion/ac-vm-accordion.component';
import { SubAccordionGroupComponent } from './components/ac-vm-accordion/sub-accordion-group/sub-accordion-group.component';
import { DialogEditPersonComponent } from './components/dialog-edit-person/dialog-edit-person.component';
import { DialogCreatePersonComponent } from './components/dialog-create-person/dialog-create-person.component';
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

@NgModule({
  declarations: [
    AcVmAccordionComponent,
    SubAccordionGroupComponent,
    DialogEditPersonComponent,
    DialogCreatePersonComponent,
    OnlyNumbersDirective,
    ConfirmDeletePersonComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule
  ],
  exports: [
    DialogEditPersonComponent,
    DialogCreatePersonComponent,
    AcVmAccordionComponent,
    OnlyNumbersDirective,
    ConfirmDeletePersonComponent
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class SharedModule { }
