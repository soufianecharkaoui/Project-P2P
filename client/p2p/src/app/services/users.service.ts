import { baseURL } from './../shared/baseurl';
import { Injectable } from '@angular/core';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseURL + 'users')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(baseURL + 'users/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
