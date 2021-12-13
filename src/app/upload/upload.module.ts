import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadListComponent } from './upload-list/upload-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';


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

  ]
})
export class UploadModule { }
