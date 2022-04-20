import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { UploadCategoryListComponent } from './upload-category-list/upload-category-list.component';
import { UploadCategoryModificationComponent } from './upload-category-modification/upload-category-modification.component';
import { UploadListComponent } from './upload-list/upload-list.component';




const routes: Routes = [
  {
    path: 'list',
    component: UploadListComponent
  },
  {
    path: 'category',
    children: [
      {
        path: 'list',
        component: UploadCategoryListComponent
      },
      {
        path: 'edit',
        component: UploadCategoryModificationComponent
      },
      {
        path: 'create',
        component: UploadCategoryModificationComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
