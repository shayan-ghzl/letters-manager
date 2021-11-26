import { Component, Input, OnInit } from '@angular/core';
import { VmAccordionObject } from '../../models/ac-vm-accordion';

@Component({
  selector: 'app-ac-vm-accordion',
  templateUrl: './ac-vm-accordion.component.html',
  styleUrls: ['./ac-vm-accordion.component.scss']
})
export class AcVmAccordionComponent implements OnInit {

@Input() accordionInitObject:VmAccordionObject[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
