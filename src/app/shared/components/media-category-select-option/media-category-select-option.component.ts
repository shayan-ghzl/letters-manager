import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-category-select-option',
  templateUrl: './media-category-select-option.component.html',
  styleUrls: ['./media-category-select-option.component.scss']
})
export class MediaCategorySelectOptionComponent implements OnInit {

  @Input('app-media-category-select-option') allCategories = [];

  constructor() { }

  ngOnInit(): void {
  }

}
