/**
 * Created by sumitsingh on 15/07/17.
 */
// import { Router } from '@angular/router';
// import { Injectable, NgZone, Inject, forwardRef } from '@angular/core';
// import {JwtHelper} from 'angular2-jwt/angular2-jwt';
// import { Headers, Http, Response } from '@angular/http';
// import { APP_CONFIG, IConfig } from '../appConfig/Iconfig';
// import { customAuthHttp } from './local-authhttp/local-authhttp';
// import {AuthHttp} from 'angular2-jwt/angular2-jwt';
// import {isNullOrUndefined} from 'util';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/Rx';
// @Injectable()
// export class subscriptionService
// {
//   private URI: string;
//   private NODE_URI;
//   private MONGO_URI;
//   zoneImpl: NgZone;
//   // private jwtHelper: JwtHelper;
//   private jwtHelper: JwtHelper;

  // constructor(zone: NgZone,
  //   @Inject(APP_CONFIG)
  //   private router: Router,
  //             private http: Http,
  //             private authHttp: AuthHttp,
  //   private _config: IConfig,
  //   private _customAuthHttp: customAuthHttp,
  //   // http: Http,
  // jwtHelper: JwtHelper) {
  //   //
  //   constructor(zone: NgZone, private router: Router, private http: Http,
  //     jwtHelper: JwtHelper,
  //     private authHttp: AuthHttp,
  //     @Inject(APP_CONFIG) private _config: IConfig) {
  //   this.URI = _config.APP_URL;
  //   this.NODE_URI = _config.NODE_URL;
  //   this.MONGO_URI = _config.mongoUrl;
  //   this.jwtHelper = JwtHelper;
  //
  // }
import { Router } from '@angular/router';
import { Injectable, NgZone, Inject, forwardRef } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { APP_CONFIG, IConfig} from '../appConfig/Iconfig';
import {isNullOrUndefined} from 'util';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import {customAuthHttp} from './local-authhttp/local-authhttp';
import { Observable } from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import 'rxjs/Rx';


@Injectable()
export class subscriptionService {

  user: Object;
  zoneImpl: NgZone;
  loggedIn = false;
  public data: any;
  public user_id: number;
  private URI: string;
  private MongoURI: string;
  private NODE_URI;
  private MONGO_URI;
  public notifications: any[];
  public chatuserName: string;
  public currentChatUser: any;
  public ChatConversations: any[];
  public chatwindow: boolean;
  public passdata: any;
  private jwtHelper: JwtHelper;

  constructor(zone: NgZone, private router: Router, private http: Http,
              jwtHelper: JwtHelper,
              private authHttp: AuthHttp,
              private _customAuthHttp: customAuthHttp,
              @Inject(APP_CONFIG) private _Iconfig: IConfig) {
    this.URI = _Iconfig.APP_URL; // "http://localhost:8000/api";
    this.MongoURI = _Iconfig.mongoUrl; // "http://localhost:8000/api";
    this.zoneImpl = zone;
    this.notifications = [];
    this.ChatConversations = [];
      this.NODE_URI = _Iconfig.NODE_URL;
      this.MONGO_URI = _Iconfig.mongoUrl;
    this.chatwindow = false;
    this.jwtHelper = jwtHelper;
    // this.getToken();
    // this.loginUser=new User();
  }
  public updateLocation(){
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   return position;
    //   // return this._customAuthHttp.post(this.MongoURI+"/userLocation/",position)
    //   //   .map((res:Response) => res.json());
    //   //     // let userPosition = position;
    //   //     // console.log(position);
    //   // // console.log(userId);
    // }, (error) => {
    //     console.log(error);
    //   })
  }
  public sendOTP(mobile_no)
  {
    let body = JSON.stringify({
      "mobileNo" : mobile_no,
    });
    return this._customAuthHttp.post(this.MONGO_URI+"website/send/sms",body)
      .map((resp:Response)=>resp.json());
  }

  public verifyOTP(mobile_no,otp)
  {
    let body = JSON.stringify({
      "mobileNo" : mobile_no,
      "otp":otp,
    });
    return this._customAuthHttp.post(this.MONGO_URI+"website/verify",body)
      .map((resp:Response)=>resp.json());
  }

  public isMobileDuplicate(mobileNo){
    return this._customAuthHttp.get(this.MONGO_URI+"website/checkduplicate/"+mobileNo)
      .map((resp:Response)=>resp.json());
  }

  public signup(userData:any)
  {
    let body = JSON.stringify(userData);
    return this._customAuthHttp.post(this.NODE_URI+'/auth/register', body);
  }
  public signup2(userData:any)
  {
    var token = sessionStorage.getItem('jwt');
    let user = this.jwtHelper.decodeToken(token);
    let body = JSON.stringify(userData);
    return this._customAuthHttp.post(this.NODE_URI+'/auth/updateProfile/' + user._id, body);
  }
  public UploadPic(columnName,tableName,path){
    let data={
      mappedColumnNames:columnName,
      tableName:tableName,
      filepath:path,
    }
    return  this.http.post(this.MongoURI+"mapper/upload",JSON.stringify(data))
      .map((resp:Response)=>resp.json());
  }
  public authenticate(username:string, password:string)
  {
    console.log(username, password);
    let body = JSON.stringify({"email": username, "password": password});
    return this._customAuthHttp.post(this.MONGO_URI+"/auth/login", body);
    // return this._customAuthHttp.post(this.NODE_URI+"subscription/login", body, {headers: headers});
  }

  public useremailverify(token)
  {
    let body = JSON.stringify({
      "token":token
    });
    return this._customAuthHttp.post(this.NODE_URI+'subscription/emailValidation', body)
      .map((res:Response) => res.json());
  }

  public getsubscriberlist(){
    return this._customAuthHttp.get(this.NODE_URI+"admin/subscriber")
      .map((res:Response) => res.json());
  }
}
