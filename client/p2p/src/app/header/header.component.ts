import { User } from './../shared/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  user: User;
  
  constructor(private authService: AuthService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.authService.getUser()
      .subscribe(user => this.user = user);
  }

  logout() {
    this.user = undefined;
    this.authService.logOut();
  }

}
