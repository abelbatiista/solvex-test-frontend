import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location.model';
import { Method } from 'src/app/models/method.model';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { MethodService } from 'src/app/services/method.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public products: Product[] = [];
  public locations: Location[] = [];
  public methods: Method[] = [];
  public user: User | undefined;

  public formSubmitted: boolean = false;

  public form: any | FormBuilder;

  public constructor(
    private _orderService: OrderService,
    private _authService: AuthService,
    private _locationService: LocationService,
    private _methodService: MethodService,
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.initializeForm();
  }

  public ngOnInit(): void {
    this.getUser();
    this.getLocations();
    this.getProducts();
    this.getMethods();
  }

  private getUser(): void {
    this.user = this._authService.user;
  }

  private getLocations(): void {
    this._locationService.getByUser(this.user?.id!).subscribe((data: any): any => {
      this.locations = data;
    });
  }

  private getProducts(): void {
    this._productService.get().subscribe((data: any): any => {
      this.products = data;
    });
  }

  private getMethods(): void {
    this._methodService.getByUser(this.user?.id!).subscribe((data: any): any => {
      this.methods = data;
    });
  }

  private initializeForm(): void {
    this.form = this._formBuilder.group({
      location: ['', [ Validators.required ]],
      method: ['', [ Validators.required ]],
      product: ['', [ Validators.required ]],
      order: ['', [ Validators.required, Validators.minLength(3) ]]
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

    const {location, method, product, order} = this.form.value;
    const _order: Order = {location: Number(location), method: Number(method), product: Number(product), order, user: this._authService.user?.id!};

    this._orderService.insert(_order).subscribe((data): any => {
      this.callSwal('success', 'Succesfully', 'Order registered!');
      this._router.navigate(['/pages', 'order']);
    }, (error): any => {
      this.callSwal('error', 'Error!', error.error.message);
    });
  }

}
