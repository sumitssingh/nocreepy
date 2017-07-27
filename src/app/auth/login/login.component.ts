import { Component, forwardRef, Inject } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { subscriptionService } from '../../../services/subscription.service'
import { AclService } from '../../../services/acl.service';
import { Response } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { JwtHelper } from 'angular2-jwt';
// import { PasswordManagementService } from '../../password-reset/service/password.service';
// import { PasswordReset } from '../../password-reset/model/password.model';
import { AppComponent } from '../../app.component';
// import { ChatService } from '../../web-content/chat/chat.Service';
// import { User } from '../../web-content/chat/chat.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [ ChatService ],
})

export class LoginComponent {

  hasSubMenu: boolean;
  userAuthToken = null;
  profile_pic= '-';
  name = 'Angular 2 Webpack Starter';
  private data: any;
  private jwtHelper: JwtHelper;
  aclService: AclService;
  public isRequesting: boolean;
  private token: string;
  private start: boolean;
  private message: string;
  private verifyotp;
  private otpentermodel: boolean;
  private otpDisplay: boolean;
  public forgetpwd: boolean;
  private verifylink: boolean;
  // private resetPassword:PasswordReset=new PasswordReset();

  constructor(
              private routers: Router,
              // private activatedRoute: ActivatedRoute,
              @Inject(forwardRef(() => AppComponent)) public app: AppComponent,
              public subscriptionservice: subscriptionService,
              // private chatService: ChatService,
              // public user: User,
              jwtHelper: JwtHelper) {
    this.message = null;
    this.forgetpwd = false;
    this.jwtHelper = jwtHelper;
    // this.aclService = AclService.getInstance();
  }

  ngOnInit() {
    // this.chatService.getMessages().subscribe(message => {
    //   console.log(message);
    //   alert(message);
    // });
    /*this.router.events.subscribe((evt) => {
     if (!(evt instanceof NavigationEnd)) {
     return;
     }
     document.body.scrollTop = 0;
     });*/
    // this.verifylogin();
    document.body.scrollTop = 0;
  }
  doLogin(event, email, pass) {
    let error = false;
    this.isRequesting = true;
    event.preventDefault();

    if (email == null || email === '') {
      this.message = 'Username is mandatory';
      error = true;
      return;
    }
    if (pass == null || pass === '') {
      this.message = 'Password is mandatory';
      error = true;
      return;
    }
    this.app.startLoader();
    console.log(email);
    this.subscriptionservice.authenticate(email, pass)
      .map((res: Response) => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
          if (this.data) {
            const token = data.token;
            if (token) {
              // this.localjwt.saveJWT(token);
              sessionStorage.setItem('jwt', token);
              const parseddata = this.jwtHelper.decodeToken(token);
              const userid = parseddata._id;
              const userName = parseddata.username;
              const userData = data.userData;
              // if(this.data.status==true)
              console.log(userid);
              if (userid) {

              }
              this.routers.navigate(['/web/social']);
            }
          } else {
            this.routers.navigate(['/']);
            this.start = false;
            this.message = this.data.info;
            // this._authservice.loggedIn = false;
            this.app.stopLoader();
          }
        },
        err => {
          this.routers.navigate(['/login']);
          this.message = 'Something went wrong.please try after some time';

          this.app.stopLoader();
          // this.start=false;
          // this.message = "UserName or Password is Incorrect";
        }
      );

  }

  onGoogleLoginSuccess = (loggedInUser) => {
    // console.log("welcome all");
    // this.userAuthToken = loggedInUser.getAuthResponse().id_token;
    // this.googleName = loggedInUser.getBasicProfile().getName();
    // this.googleEmail= loggedInUser.getBasicProfile().getEmail();
    // console.log(loggedInUser.getBasicProfile());
    // let auth2 = gapi.auth2.getAuthInstance();
    // console.log(auth2);
    // auth2.signOut().then(function () {
    //     console.log('User signed out.');
    // });
  };

  loginsuccess(){
    this.routers.navigateByUrl('/product/dashboard');
    // this._authservice.loggedIn = true;
  }

  otpVerify(otp) {
    this.otpentermodel = false;
    if (this.verifyotp === otp) {
      this.loginsuccess();
    } else {
      this.otpentermodel = false;
      this.otpDisplay = true;
    }
  }

  sendOtp(mobile) {
    this.app.startLoader();
    this.subscriptionservice.sendOTP(mobile)
      .subscribe(
        data => {
          const result = data.json();
          this.verifyotp = result.otp;
          this.otpentermodel = true;
          this.app.stopLoader();
        },
        err => {
          this.app.stopLoader();
          this.app.showError(err);

        }
      );
  }
  public redirectToLogin() {
    this.forgetpwd = false;
  }
}

