import { User } from './../shared/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  focus;
  focus1;
  user = {username: '', password: ''};
  errMess: string;
  user$: User;

  username: string = undefined;
  subscription: Subscription;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.authService.getUser()
      .subscribe(user$ => {
        //console.log(user$);
        this.user$ = user$;
      })
    this.subscription = this.authService.getUsername()
      .subscribe(name => { /*console.log(name);*/ this.username = name; });
  }

  onSubmit() {
    //console.log('User: ', this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          //console.log(this.user);
          this.router.navigate(['/users']);
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMess = error;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logOut() {
    this.username = undefined;
    this.authService.logOut();
  }
}