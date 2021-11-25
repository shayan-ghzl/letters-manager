import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ac-vm-accordion',
  templateUrl: './ac-vm-accordion.component.html',
  styleUrls: ['./ac-vm-accordion.component.scss']
})
export class AcVmAccordionComponent implements OnInit {

@Input() accordionInitObject:any;

  constructor() { }

  ngOnInit(): void {
  }

}
