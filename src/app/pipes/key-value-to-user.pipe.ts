import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Pipe({
  name: 'keyValueToUser'
})
export class KeyValueToUserPipe implements PipeTransform {

  public transform(value: any, property: string): any {
    const user: User = value;
    return value[`${property}`];
  }

}
