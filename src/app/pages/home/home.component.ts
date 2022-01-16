import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Product[] | undefined = [];

  public constructor(
    private _userService: UserService,
    private _productService: ProductService
  ) { }

  public ngOnInit(): void {
    this.get();
  }

  private get(): void {
    this._productService.get().subscribe((data): any => {
      this.products = data;
    })
  }

  private findById(): void {
    this._userService.findById(12).subscribe((data): any => {
      console.log(data);
    })
  }

  private insert(): void {
    const user: User = {name: 'a', lastname: 'a', email: 'a', password: 'a', role: 'a', image: 'a'};
    this._userService.insert(user).subscribe((data): any => {
      console.log(data);
    })
  }

  private update(): void {
    const user: User = {id: 13, name: 'luisa', lastname: 'maya', email: 'a', password: 'a', role: 'a', image: ''};
    this._userService.update(user).subscribe((data): any => {
      console.log(data);
    })
  }

  private delete(): void {
    this._userService.delete(9).subscribe((data): any => {
      console.log(data);
    })
  }

}
