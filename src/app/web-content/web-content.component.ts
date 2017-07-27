/**
 * Created by sumitsingh on 15/07/17.
 */

import {Component, AfterViewInit, ElementRef, OnInit, Renderer2, ViewChild, Inject, OnDestroy, forwardRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SocialService } from '../../services/social.service';
import { ChatService } from './chat/chat.Service';
import { AppComponent } from '../app.component';
import { User } from './chat/chat.model';
import * as $ from 'jquery';


enum MenuOrientation {
  STATIC,
  OVERLAY,
  HORIZONTAL
};


declare var jQuery: any;

@Component({
  selector: 'app-web-content',
  templateUrl: './web-content.component.html',
  styleUrls: ['./web-content.component.css'],
  providers: [SocialService, User, ChatService],
})
export class WebContentComponent  implements OnInit {

  public matchUser: any = [];
  // public user: any = {};
  price: number = 0.0;
  socket = null;
  notification: any = {};
  bidValue = '';

  constructor(public renderer: Renderer2,
              private routers: Router,
              private userDetail: User,
              public socialService: SocialService,
              public chatService: ChatService,
              @Inject(forwardRef(() => AppComponent)) public app: AppComponent
  ) {
    this.socialService.myConnection()
      .subscribe(data => {
        this.matchUser = data;
        console.log(this.matchUser);

      });
  }
  ngOnInit() {
    this.chatService.getMessages().subscribe(message => {
      this.notification = message;
      console.log(this.notification.to);
      alert(message);
    });
    this.chatService.addUser();
  }
  chat(user) {
    console.log(user);
    this.chatService.setUser(user);
    this.notification = false;
    this.routers.navigate(['/web/chat']);
  }
  isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isMobile() {
    return window.innerWidth <= 640;
  }


  // ngOnDestroy() {
  //   this.disableModal();
  //
  //   if(this.documentClickListener) {
  //     this.documentClickListener();
  //   }
  //
  //   jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
  // }
  // ngOnDestroy() {
  //   this.userDetail.id = this.hero;
  // }
}
























// // import { Component, OnInit } from '@angular/core';
// import {Component, AfterViewInit, ElementRef, Renderer, ViewChild, Inject, forwardRef} from '@angular/core';
//
// @Component({
//   selector: 'app-web-content',
//   templateUrl: './web-content.component.html',
//   styleUrls: ['./web-content.component.css']
// })
// export class WebContentComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
