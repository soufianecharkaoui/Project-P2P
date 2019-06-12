import { User } from './../shared/user';
import { UsersService } from './../services/users.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private usersService: UsersService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
        //console.log(users);
      });
  }

}
