// import { Component, AfterViewInit, ViewEncapsulation, TemplateRef, EventEmitter, NgModule, ElementRef, Renderer2, ViewChild, OnInit} from '@angular/core';
import {Component, AfterViewInit, OnInit, ElementRef, Renderer2, ViewChild, Inject, forwardRef} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
// import { ChatApp } from "./share/chat-component/chat.component";
// import { AdItem } from "./share/chat-component/model/addItem";
import { ChatService } from './web-content/chat/chat.Service';
import { User } from './web-content/chat/chat.model';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  providers: [ ChatService, User ]
})
export class AppComponent implements AfterViewInit {
  @BlockUI() blockUI: NgBlockUI;

  // @ViewChild('cardLog') cardLogContainer: any;
  // @ViewChild('tinderCardLog') tinderCardLogContainer: any;

  private message: string;
  private displayError: boolean = false;
  private displaySuccess: boolean = false;
  private displayMessage: boolean = false;
  private showChatWindow: boolean = false;
  private show: boolean = false;
  socket = null;
  // ads: AdItem[];
  // cards: any[] = [];
  // cardCursor: number = 0;
  // orientation: string = "x";
  // overlay: any = {
  //   like: {
  //     backgroundColor: '#28e93b'
  //   },
  //   dislike: {
  //     backgroundColor: '#e92828'
  //   }
  // };
  //
  // cardLogs: any = [];
  // tinderCardLogs: any = [];



  constructor(public renderer: Renderer2, public _authservice: AuthService,
              private router: Router,
              public location: Location,
              public chatService: ChatService,
              public user: User,
  ) {
    // for (var i = 0; i < 50; i++) {
    //   this.cards.push({
    //     id: i + 1,
    //     likeEvent: new EventEmitter(),
    //     destroyEvent: new EventEmitter(),
    //     url: this.getKittenUrl()
    //   });
    // }
  }

  ngOnInit() {
    // this.socket = io('http://localhost:3000');
    this.chatService.getMessages().subscribe(message => {
      console.log(message);
      alert(message);
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit() {}
  ngOnDestroy() {}

  public showError(msg){
    this.message=msg;
    this.displayError=true;
  }
  public showSuccess(msg){
    this.message=msg;
    this.displaySuccess=true;
  }
  public showMessage(msg){
    this.message=msg;
    this.displayMessage=true;
  }
  public hideDailog(){
    this.message="";
    this.displayError=false;
    this.displaySuccess=false;
    this.displayMessage=false;
  }

  public startLoader() {
    this.blockUI.start();
  }
// Function to Unblock UI
  public stopLoader() {
    this.blockUI.stop();
  }

  public goBack(){
    this.location.back();
  }

  openChatWindow(){
    this.showChatWindow=true;
    this.show=true;
  }
  closeChatWindow(){
    this.show=false;
  }


}



