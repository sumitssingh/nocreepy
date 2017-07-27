/**
 * Created by sumitsingh on 15/07/17.
 */
import {Injectable, NgZone, Inject,forwardRef} from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http,Response} from '@angular/http';
import {APP_CONFIG, IConfig} from "../appConfig/Iconfig";
import {isNullOrUndefined} from "util";
import {JwtHelper} from "angular2-jwt/angular2-jwt";
// import {customAuthHttp} from "./local-authhttp/local-authhttp";
import { Observable } from 'rxjs/Observable';
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import 'rxjs/Rx';
// import {Utils} from "ng2-bootstrap/index";

@Injectable()
export class AuthService {

  user: Object;
  zoneImpl: NgZone;
  loggedIn = false;
  public data:any;
  public user_id:number;
  private URI:string;
  private MongoURI:string;
  public notifications:any[];
  public chatuserName:string;
  public currentChatUser:any;
  public ChatConversations:any[];
  public userCoords: any = [];
  public chatwindow:boolean;

  public passdata:any;
  private jwtHelper:JwtHelper;

  constructor( zone: NgZone, private router: Router, private http: Http,
               jwtHelper:JwtHelper,
               private authHttp:AuthHttp,
               @Inject(APP_CONFIG) private _Iconfig: IConfig) {
    this.URI = _Iconfig.APP_URL;//"http://localhost:8000/api";
    this.MongoURI = _Iconfig.mongoUrl;//"http://localhost:8000/api";
    this.zoneImpl = zone;
    this.notifications=[];
    this.ChatConversations=[];
    this.chatwindow=false;
    this.jwtHelper=jwtHelper;
    // this.getToken();
    // this.loginUser=new User();
  }

  public getUser() {
    var token = sessionStorage.getItem('jwt');
    let user = this.jwtHelper.decodeToken(token);
    return this.get(this.MongoURI + '/auth/updateProfile/' + user._id)
      .map((res: Response) => res.json());
  }
  // getToken(){
  //   var token = sessionStorage.getItem('jwt');
  //   if(isNullOrUndefined(token)){
  //     console.log("Session TimeOut!")
  //     this.router.navigate(['/login']);
  //   }
  //   else {
  //     if (this.jwtHelper.isTokenExpired(token)) {
  //       console.log("Session TimeOut!")
  //       // sessionStorage.removeItem("jwt");
  //       // this.router.navigate(['/login']);
  //     }
  //     else {
  //       let user = this.jwtHelper.decodeToken(token);
  //       console.log(user);
  //
  //       this.getUser(user.userId).subscribe(respData=>{
  //           if(respData.status){
  //             if(respData.data!=null){
  //               // this.loginUser=respData.data;
  //               // this.loggedIn=true;
  //               //console.log(this.loginUser);
  //             }
  //             else{
  //               console.log(respData.info);
  //             }
  //           }
  //         },
  //         err=>{
  //           console.log(err);
  //         });
  //     }
  //   }
  // }

  get(url):Observable<Response> {
    return this.intercept(this.authHttp.get(url));
  }
  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err,source) => {
      let body = JSON.parse(err._body);
      if (err.status  == 500 && (body.message =="The token could not be parsed from the request" || body.message == "Token has expired")){
        this.logout();
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    });

  }

  public authenticate(username:string, password:string)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({"email": username, "password": password, "ttl": 1209600000});
    return this.http.post(this.URI+'/poc/authenticate', body);
  }
  public signup(userData:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(userData);
    return this.http.post(this.URI+'/register', body);
  }
  public updateLocation(id:number, location:any){
    this.userCoords.push(location.coords.latitude, location.coords.longitude);
    console.log(this.userCoords);
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // let body = JSON.stringify(userData);
    // console.log(body);
    return this.http.post(this.URI + '/auth/userLocation/' + id, this.userCoords)
    .map((res: Response) => res.json());
  }

  public updateUser(id:number, userData:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(userData);
    return this.http.post(this.URI+'/poc/updateuser/' + id, body);
  }

  logout()
  {
    this.loggedIn = false;
    // this.data = new UserDetails();
    window.localStorage.removeItem('CustomInContext');
    //this.router.navigateByUrl('/login');

    sessionStorage.clear();
    this.router.navigate(['/login']);

  }

  isLoggedIn(){

    if(sessionStorage.getItem('jwt')) {
      return !status;
    }else{
      return this.loggedIn;
    }

    // return false;
  }
  // resetdata(){
  //   this.invoicedata=[];
  // }
  setLoggedUserId(user_id){
    this.user_id = user_id;
  }
  // getLoggedUserData(){
  //   return this.loginUser;
  // }
  // setLoggedUserData(user){
  //   this.loginUser=user;
  //   this.loggedIn=true;
  // }
  //
  getLoggedUserId(){
    return this.user_id
  }


  getLoggedUserName(){
  }


  resetPasword(email)
  {
    //console.log("Inside authenticate function");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({"email": email});
    return this.http.post(this.URI+'/password/reset', body).map(res => res.json());
  }

  validateResetPasswordCode(code)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({'code':code});
    return this.http.post(this.URI+'/password/reset/validatecode',body).map(res => res.json());
  }

  changePassword(user_id,email,password,code)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({'user_id':user_id,'email':email, 'password':password,'code':code });
    return this.http.post(this.URI+'/password/update',body).map(res => res.json());
  }

  refreshdata(){
    this.passdata=[];
  }

  // setGSTIN(gstin){
  //   this.selectedGSTIN=gstin;
  // }
  // getGSTIN(){
  //   return this.selectedGSTIN;
  // }


  /* public googleLogin(profile)
   {
   return this.http.post(this.URI + "/google/sign", JSON.stringify(profile),{headers: this.getHeader()});
   }*/

}
