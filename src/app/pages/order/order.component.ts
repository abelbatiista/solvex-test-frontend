import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public orders: Order[] = [];

  public constructor(
    private _orderService: OrderService,
    private _authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.get();
  }

  private get(): void {
    this._orderService.getByUser(this._authService.user?.id!).subscribe((data: any): any => {
      this.orders = data;
    });
  }

}
