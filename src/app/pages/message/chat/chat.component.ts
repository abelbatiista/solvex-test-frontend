import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
export class ChatComponent implements OnInit, OnChanges, DoCheck, AfterViewChecked {

  @ViewChild('scroll') private myScroll: ElementRef | undefined;

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
  ) { 
    this._messageService.get().subscribe((data: any): any => {
      // this._messageService.messages = data;
    });
  }

  public ngOnInit(): void {
    this.scrollBottom();
    this.currentUser = this._authService.user;
    this._messageService.connectSocket();
    this.getMessages();
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public ngDoCheck(): void {
    // this.getMessages();
  }

  ngAfterViewChecked(): void {
      this.scrollBottom();
  }

  private scrollBottom(): void {
    try {
      this.myScroll!.nativeElement.scrollTop = this.myScroll!.nativeElement.scrollHeight;
    } catch (error) {
      return;
    }
  }

  private getMessages(): void {
    this._messageService.getMessages().subscribe((data): any => {
      this._messageService.messages = data;
    });
    this._messageService.getMessage().subscribe((message): any => {
      this._messageService.insert(message).subscribe((): any => {
        // this._messageService.messages.push(message);
      });
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
