import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  
  public users: any[] = [];
  messageText: string = '';
  message: Message | undefined;
  filter: any;
  chattingWith: User | undefined;

  public constructor(
    public _messageService: MessageService
  ) { }

  public ngOnInit(): void {
    this.getUsers();
    this.getMessages();
    this._messageService.sendMessage({from: '12212', to: 1, message: 'sdasdasdasdas', date: new Date()});
  }

  private getUsers(): void {
    this._messageService.getUsers().subscribe((data: any): any => {
      console.log(data)
      this.users = data;
    });
  }

  private getMessages(): void {
    
  }

  public openChat(event: any, user: any): void {
    this._messageService.chattingWith.next({
      name: String(user.value),
      id: Number(user.key),
      lastname: '',
      email: ''
    });
  }

  sendMessage() {
    this.message = {
      message: this.messageText,
      to: this.chattingWith!.id!,
      date: new Date()
    }
    this.messageText = ''
    this._messageService.sendMessage(this.message!)
  }

  
}
