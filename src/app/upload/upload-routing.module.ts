import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  UploadListComponent } from './upload-list/upload-list.component';

const routes: Routes = [
  {
    path: '',
    component:UploadListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UploadRoutingModule { }
