import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadListComponent } from './upload-list/upload-list.component';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadCategoryListComponent } from './upload-category-list/upload-category-list.component';
import { UploadCategoryModificationComponent } from './upload-category-modification/upload-category-modification.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import { UploadPreviewDialogContentComponent } from './upload-preview-dialog-content/upload-preview-dialog-content.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    UploadListComponent,
    UploadCategoryListComponent,
    UploadCategoryModificationComponent,
    UploadPreviewDialogContentComponent,
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ]
})
export class UploadModule { }
