import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from './../services/users.service';
import { AuthService } from './../services/auth.service';
import { User } from './../shared/user';
import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  currentUser: User;
  user: User;
  room: string;
  messageText: string = '';
  messageArray: Array<{user: String, message: String}> = [];

  constructor(private chatService: ChatService,
    private authService: AuthService,
    private usersService: UsersService,
    private route: ActivatedRoute) {
      this.chatService.newMessageReceived()
        .subscribe(data => this.messageArray.push(data));
    }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.authService.getUser()
      .subscribe(user => {
        this.currentUser = user;
        this.route.params
        .pipe(switchMap((params: Params) => {
          return this.usersService.getUser(params['id']);
        }))
        .subscribe(user => {
          this.user = user;
          if ( this.currentUser.username < this.user.username) {
            this.room = this.currentUser.username.concat(this.user.username);
          } else {
            this.room = this.user.username.concat(this.currentUser.username);
          }
          this.chatService.joinRoom({user: this.currentUser.username, room: this.room});
        });
      });
  }

  send() {
    this.chatService.sendMessage({user: this.currentUser.username, room: this.room, message: this.messageText});
    this.messageText = "";
  }
}


