import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadListComponent } from './upload-list/upload-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UploadListComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    InputTextModule,
    FileUploadModule,
    HttpClientModule,
    SharedModule
  ]
})
export class UploadModule { }
