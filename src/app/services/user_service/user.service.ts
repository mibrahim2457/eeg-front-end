import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {UserModel} from '../../models/user.model';
import {SimpleGlobal} from 'ng2-simple-global';

@Injectable()
export class UserService {
  currentUser: any;
  constructor(private http: Http, private simpleGlobal: SimpleGlobal) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

   create(user: UserModel) {
    return this.http.post(this.simpleGlobal['SERVER_HOST'] + '/users', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: any) {
     console.log('User Token:   ' + this.currentUser.token);
    return this.http.put(this.simpleGlobal['SERVER_HOST'] + '/users/' + this.currentUser.user._id, user, this.jwt()).map((response: Response) => response.json());
  }

  updatePassword(user: any) {
    return this.http.put(this.simpleGlobal['SERVER_HOST'] + '/users/password/' + this.currentUser.user._id, user, this.jwt()).map((response: Response) => response.json());
  }

  public jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {

        console.log("Index:  " + this.currentUser.token.indexOf(" "));

      let currToken = currentUser.token;
      if (currToken.startsWith('JWT') && currToken.indexOf(" ") === -1) {
          const jwt = 'JWT ';
          const token = currToken.substring(3, currToken.length);
          currToken = jwt.concat(token);
          this.currentUser.token = currToken;
      }

      console.log("Token:   " + currentUser.token);

      const headers = new Headers({ 'Authorization': this.currentUser.token });

      return new RequestOptions({ headers: headers });
    }
  }
}
