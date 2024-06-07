import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:9090/organic-shop/categories'

  constructor(private database: AngularFireDatabase, private httpClient: HttpClient) { }

  getAllCategories(){
    return this.database.list('/categories', category => {
      return category.orderByKey();
    });

    // return this.httpClient.get(this.baseUrl) as Observable<any[]>;
  }
}
