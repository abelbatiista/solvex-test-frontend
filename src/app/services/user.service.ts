import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor(
    private _http: HttpClient,
    private _socket: Socket
  ) { }

  public get(): Observable<User[]> {
    return this._http.get<any>(`${environment.base_url}/user`)
    .pipe(
      map((data): any => {
        return data.users;
      })
    );
  }

  public findById(id: number): Observable<User> {
    return this._http.get<any>(`${environment.base_url}/user/${id}`)
    .pipe(
      map((data): any => {
        return data.user;
      })
    );
  }

  public insert(user: User): Observable<User> {
    return this._http.post<any>(`${environment.base_url}/user`, user)
    .pipe(
      tap((): any => {
        this._socket.emit('sign_in', user);
      }),
      map((data): any => {
        return data.user;
      })
    );
  }

  public update(user: User): Observable<User> {
    return this._http.put<any>(`${environment.base_url}/user/${user.id}`, user)
    .pipe(
      map((data): any => {
        return data.user;
      })
    );
  }

  public delete(id: number): Observable<User> {
    return this._http.delete<any>(`${environment.base_url}/user/${id}`)
    .pipe(
      map((data): any => {
        return data.user;
      })
    );
  }
  
}
