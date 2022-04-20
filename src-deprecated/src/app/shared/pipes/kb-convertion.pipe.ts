import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appKbConvertion'
})
export class KbConvertionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
