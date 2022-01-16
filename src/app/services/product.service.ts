import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public constructor(
    private _http: HttpClient
  ) { }

  public get(): Observable<Product[]> {
    return this._http.get<any>(`${environment.base_url}/product`)
    .pipe(
      map((data): any => {
        return data.products;
      })
    );
  }

  public findById(id: number): Observable<Product> {
    return this._http.get<any>(`${environment.base_url}/product/${id}`)
    .pipe(
      map((data): any => {
        return data.product;
      })
    );
  }

  public insert(product: Product): Observable<Product> {
    return this._http.post<any>(`${environment.base_url}/product`, product)
    .pipe(
      map((data): any => {
        return data.product;
      })
    );
  }

  public update(product: Product): Observable<Product> {
    return this._http.put<any>(`${environment.base_url}/product/${product.id}`, product)
    .pipe(
      map((data): any => {
        return data.product;
      })
    );
  }

  public delete(id: number): Observable<Product> {
    return this._http.delete<any>(`${environment.base_url}/product/${id}`)
    .pipe(
      map((data): any => {
        return data.product;
      })
    );
  }
  
}
