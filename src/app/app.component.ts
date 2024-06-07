import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router, private userService: UserService){
    authService.user$.subscribe(
      user => {
        if(!user) return;

        userService.save(user).subscribe(response => {
          console.log("Post request success", response);
        }, error => {
          console.log("Error in Post request", error);
        });
        let returnUrl: any = localStorage.getItem('returnUrl');

        if(!returnUrl) return;

        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);  
      }
    );
  }
}
