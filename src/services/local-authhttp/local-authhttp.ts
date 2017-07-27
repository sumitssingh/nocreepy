/**
 * Created by sumitsingh on 15/07/17.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Headers, Response } from '@angular/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class customAuthHttp {
  constructor(private authHttp:AuthHttp,private authService: AuthService ){
  }
  private getHeader() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('selectedgstin', this.authService.getGSTIN());

    return headers;
  }
  request(url: string ): Observable<Response> {
    return this.intercept(this.authHttp.request(url));
  }
  get(url):Observable<Response> {
    return this.intercept(this.authHttp.get(url,{headers:this.getHeader()}));
  }
  post(url: string, body: string): Observable<Response> {
    return this.intercept(this.authHttp.post(url, body, {headers:this.getHeader()}));
  }

  put(url: string, body: string): Observable<Response> {
    return this.intercept(this.authHttp.put(url, body, {headers:this.getHeader()}));
  }

  delete(url: string): Observable<Response> {
    return this.intercept(this.authHttp.delete(url,{headers:this.getHeader()}));
  }
  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err,source) => {
      let body = JSON.parse(err._body);
      if (err.status  == 500 && (body.message =="The token could not be parsed from the request" || body.message == "Token has expired")){
        this.authService.logout();
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    });

  }
}
