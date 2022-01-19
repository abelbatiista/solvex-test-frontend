import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../models/message.model';

@Pipe({
  name: 'message'
})
export class MessagePipe implements PipeTransform {

  public transform(array: Message[], from: number, to: number): any {
    if (!array) {
      return array;
    }
    return array.filter(this.testing(from, to));
    /*
    return array.filter((element): any => {
      return (element.from == from && element.to == to) || (element.from == to && element.to == from);
    });
    */
  }

  private testing(from: number, to: number): any {
    return (value: Message) => {
      if(value.from === from && value.to === to) {
        return true;
      }
      if(value.from === to && value.to === from) {
        return true;
      }
      return false;
    }
  }

}
