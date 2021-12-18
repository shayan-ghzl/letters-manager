import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDeleteColorComponent } from 'src/app/shared/components/confirm-delete-color/confirm-delete-color.component';
import { Color } from 'src/app/shared/models/color';
import { ColorService } from '../color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit {
  @ViewChild(ConfirmDeleteColorComponent) confirmDeleteColorComponent!: ConfirmDeleteColorComponent;
  colors: Color[] = [];
  newColorName: string = '';
  constructor(private colorService: ColorService) {
    this.getColors();
  }

  ngOnInit(): void {

  }

  getColors() {
    this.colorService.getColors().subscribe(
      (data) => {
        this.colors = data;
      },
      (error) => { console.log(error); },
      () => { },
    );
  }
  updateFromDeleteColor(color: Color) {
    color.isRemoved = true;
    setTimeout(() => {
      let index = this.colors.findIndex(p => p.id == color.id);
      if (index > -1) {
        this.colors.splice(index, 1);
      }
    }, 1000);
  }
  addColor() {
    this.colorService.addColor({ 'id': 0, 'name': this.newColorName }).subscribe(
      (data) => {
        this.colors.unshift(data);
      },
      (error) => { console.log(error); },
      () => { },
    );
  }
}
