import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingModule } from './system-routing.module';
import { SystemListComponent } from './system-list/system-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SystemListComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class SystemModule { }
