import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './component/table-list/table-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CustomMatPaginatorIntl } from './custom-mat-paginator-int';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadSelectDialogContentComponent } from './component/upload-select-dialog-content/upload-select-dialog-content.component';
import { RemoveConfirmationDialogContentComponent } from './component/remove-confirmation-dialog-content/remove-confirmation-dialog-content.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { ModificationFormComponent } from './component/modification-form/modification-form.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    TableListComponent,
    UploadSelectDialogContentComponent,
    RemoveConfirmationDialogContentComponent,
    ModificationFormComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    RouterModule,
    MatSnackBarModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports:[
    TableListComponent,
    ModificationFormComponent
  ],
  providers: [{
    provide: MatPaginatorIntl, 
    useClass: CustomMatPaginatorIntl
  }]
})
export class SharedModule { }
