import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAddDashBeforeName]'
})
export class AddDashBeforeNameDirective {

  @Input() appAddDashBeforeName = 0;

  constructor(el: ElementRef) { 
    console.log(this.appAddDashBeforeName);
    // el.nativeElement.classList.add('');
  }

}
