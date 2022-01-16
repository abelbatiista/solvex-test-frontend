import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  public transform(image: string, type: string): string {
    if(!image) {
      return `${environment.base_url}/file/download/${type}/no-image`;
    }
    else if(image?.includes('http')){
      return image;
    }
    else if(image) {
      return `${environment.base_url}/file/download/${type}/${image}`;
    } 
    else {
      return `${environment.base_url}/file/download/${type}/no-image`;
    }
  }

}
