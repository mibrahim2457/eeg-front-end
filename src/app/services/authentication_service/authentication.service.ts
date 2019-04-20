import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {SimpleGlobal} from 'ng2-simple-global';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, private simpleGlobal: SimpleGlobal) { }

  login(email: string, password: string) {
    return this.http.post(this.simpleGlobal['SERVER_HOST'] + '/users/login',
      { email: email, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user);
        }
      });
  }

  recover(email: string) {
    return this.http.post(this.simpleGlobal['SERVER_HOST'] + '/users/recover',
      { email: email})
      .map((response: Response) => response.json());
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
  }

  private requestOptions() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return new RequestOptions({ headers: headers });
  }
}
