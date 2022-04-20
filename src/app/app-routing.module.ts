import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
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
  {
    path: 'vehicle',
    loadChildren: () => import('./vehicle/vehicle.module').then(mod => mod.VehicleModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then(mod => mod.CompanyModule)
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: HomeComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
