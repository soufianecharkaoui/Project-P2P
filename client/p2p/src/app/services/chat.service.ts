import { HttpClient } from '@angular/common/http';
import { baseURL } from './../shared/baseurl';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io(baseURL);

  constructor(private http: HttpClient) { }

  joinRoom(data: any) {
    this.socket.emit('join', data);
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    let observable = new Observable<{user: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnet(); }
    });
    return observable; 
  }

}
