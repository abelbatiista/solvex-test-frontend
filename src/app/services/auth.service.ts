import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User | undefined;

  public constructor(
    private _http: HttpClient,
    private _socket: Socket
  ) { }

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  public get role(): string {
    return this.user!.role!;
  }

  private get id(): number {
    return this.user?.id!;
  }

  private doAfterLogin(data: any): void {
    localStorage.setItem('token', data.token);
    const {id, name, lastname, email, password, role, image} = data.user;
    this.user = {id, name, lastname, email, password, role, image};
  }

  public loginCheck(): Observable<boolean> {
    return this._http.get<any>(`${environment.base_url}/auth`)
    .pipe(
      tap((data: any): any => {
        this.doAfterLogin(data);
      }), 
      map((): any => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public login({email, password}: any): Observable<any> {
    console.log(email, password, 'servicio');
    return this._http.post<any>(`${environment.base_url}/auth`, {email, password})
    .pipe(
      tap((data): any => {
        this.doAfterLogin(data);
        console.log(this.user);
        this._socket.emit('sign_in', this.user);
      })
    );
  }

  public logout(): Observable<any> {
    localStorage.removeItem('token');
    return this._http.put<any>(`${environment.base_url}/auth`, {});
  }
}
