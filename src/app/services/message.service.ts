import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public user: User | undefined;
  messages: Message[] = [];
  chattingWith = new Subject<User>();

  public constructor(
    private _socket: Socket,
    private _authService: AuthService,
    private _http: HttpClient
  ) { }

  private chatterFilter(userRole: string, chatterRole: string): boolean {
    if(userRole === 'ADMIN_ROLE' && chatterRole === 'ADMIN_ROLE') {
      return false;
    }
    else if(userRole === 'ADMIN_ROLE' && chatterRole !== 'ADMIN_ROLE') {
      return true;
    }
    else if(userRole !== 'ADMIN_ROLE' && chatterRole !== 'ADMIN_ROLE') {
      return false;
    }
    else if(userRole !== 'ADMIN_ROLE' && chatterRole === 'ADMIN_ROLE') {
      return true;
    }
    else {
      return false;
    }
  }

  private callMethod(): void {
    this._socket.emit('users');
  }

  private getUsers(): Observable<User[]> {
    return this._socket.fromEvent<User[]>('current_users')
      .pipe(
        map((data: User[]): any => {
          console.log(data);
          return data;
      })
    );
  }

  public getChatters(): Observable<User[]> {
    return this._http.get<any>(`${environment.base_url}/user`)
    .pipe(
      tap((): any => {
        this.user = this._authService.user;
      }),
      map((data): any => {
        const users: User[] = data.users;
        return users.filter((user: User): any => {
          return this.chatterFilter(this.user!.role!, user.role!);
        });
      })
    );
  }

  public get(): Observable<Message> {
    return this._http.get<any>(`${environment.base_url}/message`)
    .pipe(
      map((data): any => {
        return data.messages;
      })
    );
  }

  public insert(message: Message): Observable<Message> {
    return this._http.post<any>(`${environment.base_url}/message`, message)
    .pipe(
      map((data): any => {
        return data.message;
      })
    );
  }

  public connectSocket(): void {
    this._socket.emit('login');
  }

  public sendMessage(message: Message): void {
    this._socket.emit('message', message);
  }

  public getMessage(): Observable<Message> {
    return this._socket.fromEvent<Message>('message')
      .pipe(
        map((data: any): any => data)
    );
  }

  public getMessages(): Observable<Message[]> {
    return this._socket.fromEvent<Message[]>('messages').pipe(map((data: any): any => data));
  }

}
