import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'person',
    loadChildren: () => import('./person/person.module').then(mod => mod.PersonModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload/upload.module').then(mod => mod.UploadModule)
  },
  {
    path: 'letter',
    loadChildren: () => import('./letter/letter.module').then(mod => mod.LetterModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
