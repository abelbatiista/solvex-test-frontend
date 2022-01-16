import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public constructor(
    private _http: HttpClient
  ) { }

  /*

  // Upload Image Fetch

  public async updateImage(file: File, type: string, id: number): Promise<any> {
    try{
      const url = `${environment.base_url}/file/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);
      const data: any = await fetch(url, {
        method: 'PUT',
        // headers: { 'x-token': localStorage.getItem('token') || '' },
        body: formData
      });
      const body: any = await data.json();
      
      if(body.ok) {
        return body.filename;
      }
      else {
        return false;
      }
    }
    catch(error) {
      console.error(error);
      return false;
    }
  }
  
  */

  // Upload Image Observable
  
  public updateImage(file: File, type: string, id: number): Observable<any> {
    const formData = new FormData();
    console.log(file);
    formData.append('file', file);
    return this._http.put<any>(`${environment.base_url}/file/upload/${type}/${id}`, formData);
  }

}
