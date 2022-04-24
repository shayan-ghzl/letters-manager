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
import { DragDropUploadDirective } from './directive/drag-drop-upload.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { MatSelectSearchComponent } from './component/mat-select-search/mat-select-search.component';
import { AddPersonDialogContentComponent } from './component/add-person-dialog-content/add-person-dialog-content.component';
import { AddVehicleDialogContentComponent } from './component/add-vehicle-dialog-content/add-vehicle-dialog-content.component';
import { AddMediaCategoryDialogContentComponent } from './component/add-media-category-dialog-content/add-media-category-dialog-content.component';


@NgModule({
  declarations: [
    TableListComponent,
    UploadSelectDialogContentComponent,
    RemoveConfirmationDialogContentComponent,
    ModificationFormComponent,
    DragDropUploadDirective,
    MatSelectSearchComponent,
    AddPersonDialogContentComponent,
    AddVehicleDialogContentComponent,
    AddMediaCategoryDialogContentComponent
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
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  exports:[
    TableListComponent,
    ModificationFormComponent,
    DragDropUploadDirective
  ],
  providers: [{
    provide: MatPaginatorIntl, 
    useClass: CustomMatPaginatorIntl
  }]
})
export class SharedModule { }
