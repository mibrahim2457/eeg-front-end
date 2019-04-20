import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {SimpleGlobal} from 'ng2-simple-global';
import {Page} from '../models/ngx-datatables/page';
import {HttpParams} from '@angular/common/http';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class HistoryService {
  private currentUser: any;

  constructor(private http: Http, private simplGlobal: SimpleGlobal) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getAll(page: Page) {
    const requestOptions = this.jwt();
    const params = new URLSearchParams();
    params.append('page', page.pageNumber.toString());
    params.append('limit', page.size.toString());
    requestOptions.params = params;
    return this.http.get(this.simplGlobal['SERVER_HOST'] + '/history/user/' + this.currentUser.user._id,
      requestOptions).map((response: Response) => response.json());
  }

  getResult(recordId: String) {
    const requestOptions = this.jwt();
    const params = new URLSearchParams();
    params.append('recordId', recordId.toString());
    params.append('userId', this.currentUser.user._id.toString());
    requestOptions.params = params;
    return this.http.get(this.simplGlobal['SERVER_HOST'] + '/eeg/',
      requestOptions).map((response: Response) => response.json());
  }

  public jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {

        console.log('Index:  ' + this.currentUser.token.indexOf(' '));

      let currToken = currentUser.token;
      if (currToken.startsWith('JWT') && currToken.indexOf(' ') === -1) {
          const jwt = 'JWT ';
          const token = currToken.substring(3, currToken.length);
          currToken = jwt.concat(token);
          this.currentUser.token = currToken;
      }

      console.log('Token:   ' + currentUser.token);

      const headers = new Headers({ 'Authorization': this.currentUser.token });

      return new RequestOptions({ headers: headers });
    }
  }
}
