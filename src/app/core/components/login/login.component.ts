import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  // user!: SocialUser;
  // loggedIn!: boolean;
  // appUser!: AppUser;

  // constructor(private authService: AuthService, private socialAuthService: SocialAuthService){
  // }

  ngOnInit(): void {
    // this.socialAuthService.authState.subscribe(user => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
  }

  // login() {
  //   this.authService.login();
  // }

  // logout(){
  //   this.authService.logout();
  // }
}
