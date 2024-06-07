import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from 'shared/models/product';
import { Observable, map, take } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private database: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.database.object('/shopping-cart/' + cartId).valueChanges()
      .pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  async addToCart(product: Product){
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.database.object('/shopping-cart/' + cartId + '/items').remove();
  }



  private createCartId(){
    return this.database.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId, productId){
    return this.database.object('/shopping-cart/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
  
    let result = await this.createCartId();
    localStorage.setItem('cartId', result.key as string);
    return result.key as string;
  }

  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1))
    .subscribe((item: any) => {
      // item$.update({ product: product, quantity: (item.quantity || 0) + change });

      if (item && item.quantity) {

        let quantity =  item.quantity + change;
        if(quantity === 0) item$.remove();
        else item$.update({ 
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: quantity
        });
      } 
      else {
        item$.set({ 
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1 
        });
      }
    });
  }
}
