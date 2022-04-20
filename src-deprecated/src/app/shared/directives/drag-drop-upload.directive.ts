import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragDropUpload]'
})
export class DragDropUploadDirective {
  
  protected _elementClass: string[] = [];
  @Output() appdrop = new EventEmitter<any>();

  constructor() { }
  
  @HostBinding('class')
  get elementClass(): string {
    return this._elementClass.join(' ');
}

  @HostListener('drop', ['$event'])
   fileDroped(e: any) {
    e.preventDefault();
    e.stopPropagation();
    var index = this._elementClass.indexOf('is-dragover', 0);
    if (index > -1) {
      this._elementClass.splice(index, 1);
    }
    this.appdrop.emit(e.dataTransfer);
  }

  @HostListener('drag', ['$event'])
  @HostListener('dragstart', ['$event'])
  preventDefault(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }
  @HostListener('dragover', ['$event'])
  @HostListener('dragenter', ['$event'])
  elementAddClass(e: any) {
    e.preventDefault();
    e.stopPropagation();
    var index = this._elementClass.indexOf('is-dragover', 0);
    if (index == -1) {
      this._elementClass.push('is-dragover');
    }
  }
  @HostListener('dragend', ['$event'])
  elementRemvoeClass(e: any) {
    e.preventDefault();
    e.stopPropagation();
    var index = this._elementClass.indexOf('is-dragover', 0);
    if (index > -1) {
      this._elementClass.splice(index, 1);
    }
  }
  @HostListener('dragleave', ['$event'])
  elementRemvoeClass2(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.classList.contains('uploader-inline')){
      var index = this._elementClass.indexOf('is-dragover', 0);
      if (index > -1) {
        this._elementClass.splice(index, 1);
      }
    }
  }
}
