import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyModificationComponent } from './company-modification/company-modification.component';

const routes: Routes = [
  {
    path: 'list',
    component: CompanyListComponent
  },
  {
    path: 'edit',
    component: CompanyModificationComponent
  },
  {
    path: 'create',
    component: CompanyModificationComponent
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
export class CompanyRoutingModule { }
