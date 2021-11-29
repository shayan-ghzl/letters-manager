import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AcVmAccordionComponent } from './shared/components/ac-vm-accordion/ac-vm-accordion.component';
import { SubAccordionGroupComponent } from './shared/components/ac-vm-accordion/sub-accordion-group/sub-accordion-group.component';

import { PersonModule } from './person/person.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AcVmAccordionComponent,
    SubAccordionGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    PersonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
