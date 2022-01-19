import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'ngx-filter-pipe';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public messageText: string = '';
  public message: Message | undefined;
  public messages: Message[] | undefined = [];
  public currentUser: User | undefined;
  public filter: any;
  public chattingWith: User | undefined;

  public constructor(
    public _messageService: MessageService,
    private _authService: AuthService,
    private _filter: FilterPipe
  ) { }

  public ngOnInit(): void {
    this.currentUser = this._authService.user;
    this.getMessages();
  }

  private getMessages(): void {
    this._messageService.getMessages().subscribe((data): any => {
      this._messageService.messages = data;
    });
    this._messageService.getMessage().subscribe((message): any => {
      this._messageService.messages.push(message);
    });
    this._messageService.chattingWith.subscribe((user): any => {
      this.chattingWith = user;
    });
  }

  public sendMessage(): void {
    this.message = {
      from: this.currentUser?.id,
      message: this.messageText,
      to: this.chattingWith!.id!,
      date: new Date()
    }
    this.messageText = ''
    this._messageService.sendMessage(this.message!)
  }

}
