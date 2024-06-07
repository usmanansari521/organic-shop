import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import * as firebase from 'firebase/auth';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "http://localhost:9090/organic-shop/users";

  constructor(private database: AngularFireDatabase, private httpClient: HttpClient) { }

  save(user: SocialUser): Observable<AppUser>{
    
    return this.httpClient.post(this.baseUrl, {
      id: user.id,
      name: user.name,
      email: user.email
    }) as Observable<AppUser>;
    
    // this.database.object('/users/' + user.uid).update({
    //   name: user.displayName,
    //   email: user.email
    // });

  }

  get(uid: any): Observable<AppUser> {
    // return this.database.object('/users/' + uid);

    return this.httpClient.get(this.baseUrl + '/' + uid) as Observable<AppUser>;
  }
}
