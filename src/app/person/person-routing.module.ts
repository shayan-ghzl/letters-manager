import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonModificationComponent } from './person-modification/person-modification.component';


const routes: Routes = [
  {
    path: 'list',
    component: PersonListComponent
  },
  {
    path: 'edit',
    component: PersonModificationComponent
  },
  {
    path: 'create',
    component: PersonModificationComponent
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
export class PersonRoutingModule { }
