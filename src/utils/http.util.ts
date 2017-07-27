/**
 * Created by sumitsingh on 15/07/17.
 */

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestOptionsArgs, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/Rx';
//import {Notification} from '../models/Notification';
import { AuthHttp, JwtHelper } from "angular2-jwt/angular2-jwt";



@Injectable()
export class HttpUtil {

  //requestNotifier = new ReplaySubject<Notification>(1);
  private jwt = sessionStorage.getItem('jwt');
  private jwtHelper: JwtHelper;
  constructor(private http: Http, jwtHelper: JwtHelper) {

  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request('get', url, options);
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request('post', url, body, options);
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request('put', url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request('delete', url, options);
  }

  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request('patch', url, body, options);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request('head', url, options);
  }

  private _request(method: string, ...httpParams: any[]): Observable<Response> {
    if(this.checktokenExpiry()){
      let globalHeaders = [{'Content-Type': 'application/json'}];
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('jwt'));
      this.http.get('http://www.genieuslabs.com/laravel/public/index.php/api/authenticate/refresh', {headers})
        .map(res => res.json)
        .flatMap((data) => {
          return this.http[method].apply(this.http, httpParams, {headers});
        });


    }
    else {

      let request:any;
      //this._notify({type: 'start'});
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('jwt'));
      return this.http[method].apply(this.http, httpParams, {headers});
    }


    // return this.http[method].apply(this.http, httpParams)
    //   .do((res: any) => this._notify({ type: 'done' }),
    //   (err: any) => this._notify({ type: 'error', data: err }),
    //   () => this._notify({ type: 'complete' }));
  }

  /* private _notify(notification: Notification) {
   this.requestNotifier.next(notification);
   }
   */

  private checktokenExpiry(){

    var currentTime = new Date();
    var jwtExp = this.jwtHelper.getTokenExpirationDate(sessionStorage.getItem('jwt'));
    var difference = jwtExp.getTime() - currentTime.getTime();

    var mins = Math.floor(difference/60000);

    if(mins < 30){
      return true;
    }
    else{
      return false;
    }
  }

}




export function tokenNotExpired(tokenName = 'id_token', jwt?:string):boolean {

  const token:string = jwt || sessionStorage.getItem(tokenName);

  const jwtHelper = new JwtHelper();

  return token && !jwtHelper.isTokenExpired(token, null);
}
