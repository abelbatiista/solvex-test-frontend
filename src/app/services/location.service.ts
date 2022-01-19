import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../models/location.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public constructor(
    private _http: HttpClient
    ) { }

  public getByUser(id: number): Observable<Location> {
    return this._http.get<any>(`${environment.base_url}/location/${id}`)
    .pipe(
      map((data): any => {
        return data.locations;
      })
    );
  }

  public insert(location: Location): Observable<Location> {
    return this._http.post<any>(`${environment.base_url}/location`, location)
    .pipe(
      map((data): any => {
        return data.location;
      })
    );
  }

}
