import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public user: User | undefined;
  messages: Message[] = [];
  chattingWith = new Subject<User>();

  public constructor(
    private _socket: Socket
  ) { }

  public sendMessage(message: Message) {
    this._socket.emit('message', message);
  }

  public getMessage(): Observable<void> {
    return this._socket.fromEvent('message').pipe(map((data: any): any => data))
  }

  public getUsers(): Observable<void> {
    return this._socket.fromEvent('current_users').pipe(map((data: any): any => data))
  }

}
