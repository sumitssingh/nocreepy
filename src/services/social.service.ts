/**
 * Created by sumitsingh on 17/07/17.
 */
import { Router } from '@angular/router';
import { Injectable, NgZone, Inject, forwardRef } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { APP_CONFIG, IConfig} from '../appConfig/Iconfig';
import {isNullOrUndefined} from 'util';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
// import {customAuthHttp} from './local-authhttp/local-authhttp';
import { Observable } from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import 'rxjs/Rx';


@Injectable()
export class SocialService {

  user: Object;
  zoneImpl: NgZone;
  loggedIn = false;
  public data: any;
  public userCoords: any = [];
  public user_id: number;
  private URI: string;
  private MongoURI: string;
  public notifications: any[];
  public chatuserName: string;
  public currentChatUser: any;
  public ChatConversations: any[];
  public chatwindow: boolean;
  public passdata: any;
  public senderId: any;
  private jwtHelper: JwtHelper;

  constructor(zone: NgZone, private router: Router, private http: Http,
              jwtHelper: JwtHelper,
              private authHttp: AuthHttp,
              @Inject(APP_CONFIG) private _Iconfig: IConfig) {
    this.URI = _Iconfig.APP_URL; // 'http://localhost:8000/api';
    this.MongoURI = _Iconfig.mongoUrl; // 'http://localhost:8000/api';
    this.zoneImpl = zone;
    this.notifications = [];
    this.ChatConversations = [];
    this.chatwindow = false;
    this.jwtHelper = jwtHelper;
    this.getToken();
    // this.loginUser=new User();
  }
  //
  public updateLocation(location) {
    this.userCoords.push(location.coords.latitude, location.coords.longitude);
    console.log(this.userCoords);
    var token = sessionStorage.getItem('jwt');
    let user = this.jwtHelper.decodeToken(token);
    console.log(user);
    if (user._id) {
      return this.http.post(this.MongoURI + '/auth/userLocation/', +user._id, this.userCoords)
    }
      // .map((res: Response) => res.json());
    // navigator.geolocation.getCurrentPosition(function(position){
    //   var pos = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   };
    //
    // }, (error) => {
    //   console.log(error)
    // });

  }

  public getMatch(){
    var token = sessionStorage.getItem('jwt');
    let user = this.jwtHelper.decodeToken(token);
    return this.get(this.MongoURI + '/user/randomUser/' + user._id)
      .map((res: Response) => res.json());
  }
  public makePayment(data) {
    console.log(data);
    return this.http.post(this.MongoURI + '/auth/charge', data);
    // return this.http.post('http://localhost:3080/auth/charge', data)
    //   .map((res: Response) => res.json())
  }
  public makeConnection(Id) {
    const token = sessionStorage.getItem('jwt');
    const user = this.jwtHelper.decodeToken(token);
    this.senderId = {'Id': Id };
    return this.http.post(this.URI + '/message/makeConnection/' + user._id, this.senderId)
      .map((res: Response) => res.json());
  }
  public myConnection() {
    const token = sessionStorage.getItem('jwt');
    const user = this.jwtHelper.decodeToken(token);
    return this.http.get(this.URI + '/message/myConnection/' + user._id)
      .map((res: Response) => res.json());
  }
  public getUser(userId) {
    var token = sessionStorage.getItem('jwt');
    let user = this.jwtHelper.decodeToken(token);
    return this.get(this.MongoURI + '/auth/updateProfile/' + user._id)
      .map((res: Response) => res.json());
  }

  getToken() {
    var token = sessionStorage.getItem('jwt');
    if (isNullOrUndefined(token)) {
      console.log('Session is TimeOut!')
      this.router.navigate(['/login']);
    }
    else {
      if (this.jwtHelper.isTokenExpired(token)) {
        console.log('Session is TimeOut!')
        // sessionStorage.removeItem('jwt');
        // this.router.navigate(['/login']);
      }
      else {
        let user = this.jwtHelper.decodeToken(token);
        console.log(user);

        this.getUser(user.userId).subscribe(respData => {
            if (respData.status) {
              if (respData.data != null) {
                // this.loginUser=respData.data;
                // this.loggedIn=true;
                //console.log(this.loginUser);
              }
              else {
                console.log(respData.info);
              }
            }
          },
          err => {
            console.log(err);
          });
      }
    }
  }

  get(url): Observable<Response> {
    return this.intercept(this.authHttp.get(url));
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      let body = JSON.parse(err._body);
      if (err.status == 500 && (body.message == 'The token could not be parsed from the request' || body.message == 'Token has expired')) {
        // this.logout();
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    });

  }

  public authenticate(username: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({'email': username, 'password': password, 'ttl': 1209600000});
    return this.http.post(this.URI + '/poc/authenticate', body);
  }

  public signup(userData: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(userData);
    return this.http.post(this.URI + '/register', body);
  }

  public updateUser(id: number, userData: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(userData);
    return this.http.post(this.URI + '/poc/updateuser/' + id, body);
  }
}
