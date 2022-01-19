import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Method } from '../models/method.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MethodService {

  public constructor(
    private _http: HttpClient
  ) { }

  public getByUser(id: number): Observable<Method> {
    return this._http.get<any>(`${environment.base_url}/method/${id}`)
    .pipe(
      map((data): any => {
        return data.methods;
      })
    );
  }

  public insert(method: Method): Observable<Method> {
    return this._http.post<any>(`${environment.base_url}/method`, method)
    .pipe(
      map((data): any => {
        return data.method;
      })
    );
  }

}
