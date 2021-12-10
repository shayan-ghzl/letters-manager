import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LetterListComponent } from './letter-list/letter-list.component';



const routes: Routes = [
  {
    path: '',
    component: LetterListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
