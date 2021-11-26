import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { VmAccordionGroup } from 'src/app/shared/models/ac-vm-accordion';

@Component({
  selector: 'app-sub-accordion-group',
  templateUrl: './sub-accordion-group.component.html',
  styleUrls: ['./sub-accordion-group.component.scss']
})
export class SubAccordionGroupComponent implements OnInit {

  @Input() accordionGroupItem: VmAccordionGroup[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
