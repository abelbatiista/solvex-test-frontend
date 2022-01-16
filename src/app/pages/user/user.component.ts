import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: User[] | undefined = [];

  public constructor(
    private _userService: UserService
  ) { }

  public ngOnInit(): void {
    this.get();
  }

  private get(): void {
    this._userService.get().subscribe((data): any => {
      this.users = data;
    });
  }

}
