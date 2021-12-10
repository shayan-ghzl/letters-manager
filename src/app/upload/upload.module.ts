import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  UploadRoutingModule } from './upload-routing.module';
import {  UploadListComponent } from './upload-list/upload-list.component';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    UploadListComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    InputTextModule
  ]
})
export class UploadModule { }
