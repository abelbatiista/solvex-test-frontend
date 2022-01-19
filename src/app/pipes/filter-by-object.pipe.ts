import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByObject'
})
export class FilterByObjectPipe implements PipeTransform {

  public transform(array: any[], filter: any): any {
    if (!array) {
      return array;
    }
    return;
  }
}
