import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { LetterListComponent } from './letter-list/letter-list.component';
import { LetterModificationComponent } from './letter-modification/letter-modification.component';



const routes: Routes = [
  {
    path: 'list',
    component: LetterListComponent
  },
  {
    path: 'edit',
    component: LetterModificationComponent
  },
  {
    path: 'create',
    component: LetterModificationComponent
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
export class LetterRoutingModule { }
