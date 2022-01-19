import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chatter',
  templateUrl: './chatter.component.html',
  styleUrls: ['./chatter.component.css']
})
export class ChatterComponent implements OnInit {

  public users: User[] = [];

  public constructor(
    public _messageService: MessageService,
    private _authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this._messageService.getChatters().subscribe((data: any): any => {
      this.users = data;
    });
  }

  public openChat(event: any, data: any): void {
    const user: User = data.value;
    this._messageService.chattingWith.next(user);
  }

}
