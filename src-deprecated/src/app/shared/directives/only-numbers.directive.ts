import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor() { }

  @HostListener('paste', ['$event']) preventPaste(e: any) {
    e.preventDefault();
    return false;
  }

  @HostListener('input', ['$event'])
  @HostListener('keydown', ['$event'])
  @HostListener('keyup', ['$event'])
  // @HostListener('mousedown', ['$event'])
  // @HostListener('mouseup', ['$event'])
  @HostListener('select', ['$event'])
  @HostListener('contextmenu', ['$event'])
  @HostListener('drop', ['$event'])
  setInputFilter(e: any): void | boolean {
    var codeKey = e.keyCode, allowed = [8, 39, 37];
    if (!((codeKey >= 48 && codeKey <= 57) || (codeKey >= 96 && codeKey <= 105) || allowed.includes(codeKey))) {
      e.preventDefault();
      return false;
    }
  }
}
