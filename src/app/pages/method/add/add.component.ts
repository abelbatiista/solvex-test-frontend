import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Method } from 'src/app/models/method.model';
import { MethodService } from 'src/app/services/method.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public formSubmitted: boolean = false;

  public form: any | FormBuilder;

  public constructor(
    private _methodService: MethodService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.initializeForm();
  }

  public ngOnInit(): void {
  }

  private initializeForm(): void {
    this.form = this._formBuilder.group({
      brand: ['', [ Validators.required, Validators.minLength(3) ]],
      number: ['', [ Validators.required, Validators.minLength(3) ]],
      expiration: ['', [ Validators.required, Validators.minLength(3) ]],
      cvv: ['', [ Validators.required, Validators.minLength(3) ]]
    });
  }

  private callSwal(icon: any, title: string, text: string): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

  public invalidField(field: string): boolean {
    if(this.form.get(field).invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  public add(): void {
    this.formSubmitted = true;

    if(this.form.invalid) {
      console.log('invalid');
      return;
    }

    const {brand, number, expiration, cvv} = this.form.value;
    const method: Method = {brand, number, expiration, cvv, user: this._authService.user?.id!};

    this._methodService.insert(method).subscribe((data): any => {
      this.callSwal('success', 'Succesfully', 'Method registered!');
      this._router.navigate(['/pages', 'method']);
    }, (error): any => {
      this.callSwal('error', 'Error!', error.error.message);
    });
  }

}
