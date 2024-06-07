import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { title } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:9090/organic-shop/products';

  constructor(private database: AngularFireDatabase, private httpClient: HttpClient) { }

  createProduct(product){
    // return this.httpClient.post(this.baseUrl, {
    //   title: product.title,
    //   price: product.price,
    //   category: {
    //     name: product.category.name
    //   },
    //   imageUrl: product.imageUrl
    // });
    return this.database.list('/products').push(product);
  }

  getAllProducts(){
    // return this.httpClient.get(this.baseUrl);
    return this.database.list('/products');
  }

  getProduct(productId){
    // return this.httpClient.get(this.baseUrl + '/' + productId);
    return this.database.object('/products/' + productId);
  }

  updateProduct(productId, product){
    // return this.httpClient.put(this.baseUrl + '/' + productId, {
    //   title: product.title,
    //   price: product.price,
    //   category: {
    //     name: product.category
    //   },
    //   imageUrl: product.imageUrl
    // })
    return this.database.object('/products/' + productId).update(product);
  }

  deleteProduct(productId){
    // return this.httpClient.delete(this.baseUrl + '/' + productId);
    return this.database.object('/products/' + productId).remove();
  }
}
