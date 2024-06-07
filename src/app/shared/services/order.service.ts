import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private database: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.database.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.database.list('/orders');
  }

  getOrdersByUser(uid: any) {
    return this.database.list('/orders', user => {
      return user.orderByChild('/userId').equalTo(uid);
    })
  }

}
