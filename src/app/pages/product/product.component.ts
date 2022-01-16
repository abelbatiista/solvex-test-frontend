import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: Product[] | undefined = [];

  public constructor(
    private _productService: ProductService
  ) { }

  public ngOnInit(): void {
    this.get();
  }

  private get(): void {
    this._productService.get().subscribe((data): any => {
      this.products = data;
    });
  }

}
