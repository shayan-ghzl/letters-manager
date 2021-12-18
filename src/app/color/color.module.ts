import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorRoutingModule } from './color-routing.module';
import { ColorListComponent } from './color-list/color-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ColorListComponent
  ],
  imports: [
    CommonModule,
    ColorRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ColorModule { }
