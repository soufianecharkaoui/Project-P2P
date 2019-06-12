import { User } from './../shared/user';
import { UsersService } from './../services/users.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  user: User;

  constructor(private usersService: UsersService,
    private route: ActivatedRoute,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.usersService.getUser(params['id']);
      }))
      .subscribe(user => this.user = user);
  }

}
