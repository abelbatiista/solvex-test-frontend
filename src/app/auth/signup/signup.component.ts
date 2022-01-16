import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public formSubmitted: boolean = false;

  public form: any | FormBuilder;

  public constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) { 
    this.initializeForm();
  }

  public ngOnInit(): void {
  }

  public signUp(): void {
    this.formSubmitted = true;

    if(this.form.invalid) {
      console.log('invalid');
      return;
    }

    const {name, lastname, email, password} = this.form.value;
    const user: User = {name, lastname, email, password};

    this._userService.insert(user).subscribe((data): any => {
      this.callSwal('success', 'Succesfully', 'User registered!');
      this._router.navigate(['/login']);
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

  public invalidPasswords(): boolean {
    const password = this.form.get('password').value;
    const confirmPassword = this.form.get('confirmPassword').value;

    if((password !== confirmPassword) && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  private initializeForm(): void {
    this.form = this._formBuilder.group({
      name: ['', [ Validators.required, Validators.minLength(3) ]],
      lastname: ['', [ Validators.required, Validators.minLength(3) ]],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required ]],
      confirmPassword: ['', [ Validators.required ]]
    }, {
      validators: this.samePasswords('password', 'confirmPassword')
    });
  }

  private samePasswords(password: string, confirmPassword: string): Function {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if(passwordControl!.value === confirmPasswordControl!.value) {
        confirmPasswordControl?.setErrors(null);
      }
      else {
        confirmPasswordControl?.setErrors({isNotSame: true});
      }
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
