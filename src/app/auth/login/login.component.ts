import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted: boolean = false;

  public form: any | FormBuilder;

  public constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _ngZone: NgZone
  ) { 
    this.initializeForm();
  }

  public ngOnInit(): void {
  }

  private initializeForm(): void {
    this.form = this._formBuilder.group({
      email: [localStorage.getItem('email') || '', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required ]],
      remember: [false]
    });
  }

  public login(): void {
    const { email, password } = this.form.value;

    this.formSubmitted = true;

    if(this.form.invalid) {
      return;
    }

    this._authService.login({email, password}).subscribe((data): any => {

      if(this.form.get('remember').value){
        localStorage.setItem('email', this.form.get('email').value);
      }
      else {
        localStorage.removeItem('email');
      }

      this.callSwal('success', 'Succesfully', 'User logged!');
      this._ngZone.run((): any => {
        this._router.navigate(['/']);
      });
    }, (error): any => {
      this.callSwal('error', 'Error!', error.error.message);
    });
  }

  public invalidField(field: string): boolean {
    if(this.form.get(field).invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  private callSwal(icon: any, title: string, text: string): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

}
