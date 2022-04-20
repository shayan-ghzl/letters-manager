import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-remove-confirmation-dialog-content',
  templateUrl: './remove-confirmation-dialog-content.component.html',
  styleUrls: ['./remove-confirmation-dialog-content.component.scss']
})
export class RemoveConfirmationDialogContentComponent  {


  constructor(
    public dialogRef: MatDialogRef<RemoveConfirmationDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }



}
