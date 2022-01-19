import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public constructor(
    private _http: HttpClient
  ) { }

  public getByUser(id: number): Observable<Order> {
    return this._http.get<any>(`${environment.base_url}/order/${id}`)
    .pipe(
      map((data): any => {
        return data.orders;
      })
    );
  }

  public insert(order: Order): Observable<Order> {
    return this._http.post<any>(`${environment.base_url}/order`, order)
    .pipe(
      map((data): any => {
        return data.order;
      })
    );
  }

}
