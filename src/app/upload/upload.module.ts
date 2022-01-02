import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadListComponent } from './upload-list/upload-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { UploadCategoryComponent } from './upload-category/upload-category.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UploadListComponent,
    UploadCategoryComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    InputTextModule,
    HttpClientModule,
    SharedModule,
    ToastModule,
    FormsModule
  ]
})
export class UploadModule { }
