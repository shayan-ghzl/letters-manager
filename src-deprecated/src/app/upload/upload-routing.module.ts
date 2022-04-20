import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadCategoryComponent } from './upload-category/upload-category.component';
import {  UploadListComponent } from './upload-list/upload-list.component';

const routes: Routes = [
  {
    path: '',
    component:UploadListComponent
  },
  {
    path: 'category',
    component:UploadCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UploadRoutingModule { }
