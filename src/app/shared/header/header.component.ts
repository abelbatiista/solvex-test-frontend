import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User | undefined;

  public constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  public ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.user = this._authService.user;
  }

  public logout(): void {
    this._authService.logout().subscribe((): any => {
      this.callSwal('success', 'Succesfully', 'User logged out!');
      this._router.navigate(['/login']);
    });
  }

  private callSwal(icon: any, title: string, text: string): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

}
