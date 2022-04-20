import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterListComponent } from './letter-list/letter-list.component';
import { LetterModificationComponent } from './letter-modification/letter-modification.component';
import { LetterRoutingModule } from './letter-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    LetterListComponent,
    LetterModificationComponent
  ],
  imports: [
    CommonModule,
    LetterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule
  ]
})
export class LetterModule { }
