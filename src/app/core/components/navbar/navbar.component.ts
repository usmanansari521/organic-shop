import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserService } from 'shared/services/user.service';
import { app } from '../../../../../server';
import { error } from 'console';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  appUser: AppUser | null = null;
  cart$!: Observable<ShoppingCart>;

  user!: SocialUser;
  loggedIn!: boolean;

  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private socialAuthService: SocialAuthService){
  }

  async ngOnInit() {

    this.socialAuthService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);
    });

    this.authService.appUser$.subscribe(appUser => {
      if(appUser)
        this.appUser = appUser;
      }, 
        error => {
          console.error('Error fetching user info: ', error);
        }
      );

    this.cart$ = await this.shoppingCartService.getCart();
  }

  login() {
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }
}
