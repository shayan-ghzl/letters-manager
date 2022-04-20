import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleModificationComponent } from './vehicle-modification/vehicle-modification.component';

const routes: Routes = [
  {
    path: 'list',
    component: VehicleListComponent
  },
  {
    path: 'edit',
    component: VehicleModificationComponent
  },
  {
    path: 'create',
    component: VehicleModificationComponent
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
export class VehicleRoutingModule { }
