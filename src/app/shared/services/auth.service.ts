import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, filter, map, of, switchMap } from 'rxjs';
import * as firebase  from '@firebase/auth';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from './user.service';
import { error } from 'console';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<SocialUser>;

  constructor(
    private userService: UserService, 
    private socialAuthService: SocialAuthService,
    private angularFireAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 

    // this.user$ = angularFireAuth.authState
    //   .pipe(filter(user => user !== null)) as unknown as Observable<AppUser>;

    this.user$ = socialAuthService.authState.pipe(filter(user => user !== null));
  }

  login(){
    let returnUrl: any = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    // this.angularFireAuth.signInWithRedirect(new firebase.GoogleAuthProvider());

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout(){
    // this.angularFireAuth.signOut();
    this.socialAuthService.signOut();
  }
  
  get appUser$(): Observable<AppUser>{
    return this.user$
      .pipe(
        map(user => {
          if (user) return this.userService.get(user.id).subscribe(user => {
            console.log("Signed-in user info: ", user);
          }, error => {
            console.log("User not accessed: ", error);
          });

          return of(null);
        })
      ) as unknown as Observable<AppUser>
  }


  // get appUser$(): Observable<AppUser>{
  //   return this.user$
  //     .pipe(
  //       map(user => {
  //         if (user) return this.userService.get(user.id).subscribe(user => {
  //           console.log("Accessed user info: ", user);
  //         }, error => {
  //           console.log("User not accessed: ", error);
  //         });

  //         return of(null);
  //       })
  //     ) as unknown as Observable<AppUser>;
  // }
}
