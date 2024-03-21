import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringArray',
  standalone: true
})
export class StringArrayPipe implements PipeTransform {

  transform(value: string): string[] {
    // Replace patterns in the input text
    if (value != null) {
      return value.split(',');
    }
    return [];
  }


}
