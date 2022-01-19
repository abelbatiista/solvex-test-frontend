import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public userRole: string = '';

  public constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getRole();
  }

  private getRole(): void {
    this.userRole = this._authService.role;
  }

}
