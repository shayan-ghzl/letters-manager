import { Component, Input, OnInit } from '@angular/core';
import { MediaCategory } from '../../models/upload';

@Component({
  selector: '[app-media-category-table]',
  templateUrl: './media-category-table.component.html',
  styleUrls: ['./media-category-table.component.scss']
})
export class MediaCategoryTableComponent implements OnInit {
@Input('app-media-category-table') categories:MediaCategory[] = [];
  constructor() { 
  }

  ngOnInit(): void {
  }
  addDashBeforeName(){
    alert();
  }
}
