import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
  orders$: Observable<any>;

  constructor(private orderService: OrderService) { 
    this.orders$ = orderService.getOrders().valueChanges();
  }
}
