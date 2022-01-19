import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
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
    private _locationService: LocationService,
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
      label: ['', [ Validators.required, Validators.minLength(3) ]],
      adress: ['', [ Validators.required, Validators.minLength(3) ]],
      street: ['', [ Validators.required, Validators.minLength(3) ]],
      number: ['', [ Validators.required, Validators.minLength(3) ]],
      sector: ['', [ Validators.required, Validators.minLength(3) ]],
      city: ['', [ Validators.required, Validators.minLength(3) ]],
      province: ['', [ Validators.required, Validators.minLength(3) ]],
      country: ['', [ Validators.required, Validators.minLength(3) ]],
      code: ['', [ Validators.required, Validators.minLength(3) ]],
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

    const {label, adress, street, number, sector, city, province, country, code} = this.form.value;
    const location: Location = {label, adress, street, number, sector, city, province, country, code, user: this._authService.user?.id!};

    this._locationService.insert(location).subscribe((data): any => {
      this.callSwal('success', 'Succesfully', 'Location registered!');
      this._router.navigate(['/pages', 'location']);
    }, (error): any => {
      this.callSwal('error', 'Error!', error.error.message);
    });
  }

}
