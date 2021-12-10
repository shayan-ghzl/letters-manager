import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonRoutingModule } from './media-routing.module';
import { MediaListComponent } from './media-list/media-list.component';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    MediaListComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    InputTextModule
  ]
})
export class MediaModule { }
