// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
// import * as io from 'socket.io-client';
//
// export class ChatService {
//   private url = 'http://localhost:4000';
//   private socket;
//
//   sendMessage(message, to){
//     this.socket.emit('add-message', message, to);
//   }
//   addUser(user) {
//     this.socket.emit('adduser', user);
//   }
//   getMessages() {
//     let observable = new Observable(observer => {
//       this.socket = io(this.url);
//       this.socket.on('message', (data) => {
//         console.log(data);
//         observer.next(data);
//       });
//       return () => {
//         this.socket.disconnect();
//       };
//     })
//     return observable;
//   }
// }


/**
 * Created by Genieji on 17-11-2016.
 */

import { Injectable, NgZone, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import { APP_CONFIG, IConfig } from '../../../appConfig/Iconfig';
import { customAuthHttp } from '../../../services/local-authhttp/local-authhttp';
import { ChatComponent } from './chat.component';
import { User } from './chat.model';
import 'rxjs/Rx';
// import { AdItem } from '../model/addItem';

@Injectable()
export class ChatService {
  private data: any = [];
  public userDetails: any = {};
  private URI: string;
  private ChatURL: string;
  // private socket;
  // private Mongo_URL: string;
  private url = 'http://localhost:8000';
  private socket;
  private jwtHelper: JwtHelper;

  constructor(/*private authHttp:AuthHttp,*/ @Inject(APP_CONFIG) private _config: IConfig,
              private _customAuthHttp: customAuthHttp,
              jwtHelper: JwtHelper,
              public user: User) {
    this.URI = _config.APP_URL;
    this.ChatURL = _config.Chat_Server_URL;
    this.jwtHelper = jwtHelper;
    // this.Mongo_URL = _config.mongoUrl;
    // this.NODE_APP_URL=_config.NODE_APP_URL;
    // this.socket = io(this.ChatURL);
  }
  //
  // getChatUrl() {
  //   return this.ChatURL;
  // }

  setUser(details) {
    console.log(details);
    this.user.username = details.username;
    this.user.id = details._id;
    this.user.image = details.userImage[0];
  }
  sendMessage(message, to) {
    this.socket.emit('add-message', message, to);
  }
  addUser() {
    const token = sessionStorage.getItem('jwt');
    const user = this.jwtHelper.decodeToken(token);
    this.socket.emit('adduser', user._id);
  }
  getMessages() {
    const observable = new Observable(observer => {
      this.socket = io(this.ChatURL);
      this.socket.on('message', (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

}

















  // public GetChatConversation(UserId1,UserId2) {
  //
  //   return this._customAuthHttp.get(this.URI + '/chatinfo/' + UserId1+"/"+UserId2)
  //
  // }
  // public UpdateChatConversation(UserId1,UserId2,ConversationsHistory) {
  //
  //   return this._customAuthHttp.get(this.URI + '/updatechat/chatinfo/' + UserId1+"/"+UserId2+"/"+ConversationsHistory)
  //
  // }

  //
  // public GetUsersOnline(UserId){
  //   return this._customAuthHttp.get(this.URI + '/Getuseronline/' + UserId)
  // }
  // public UpdateOnline(UserId,IsOnline)
  // {
  //   return this._customAuthHttp.get(this.URI + '/useronline/' + UserId+"/"+IsOnline)
  // }
  // setUserOnline(userId) {
  //   console.log(userId);
  //   this.socket.emit('adduser', userId);
  // }

  // sendMessage(message) {
  //   this.socket.emit('sendchat', message);
  // }
  // private url = 'http://localhost:4000';
  // private socket;

  // sendMessage(message, to) {
  //   this.socket.emit('add-message', message, to);
  // }
  // // addUser(user) {
  // //   this.socket.emit('adduser', user);
  // // }
  // getMessages() {
  //   let observable = new Observable(observer => {
  //     this.socket = io(this.ChatURL);
  //     this.socket.on('message', (data) => {
  //       console.log(data);
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   })
  //   return observable;
  // }
//   callvideo(users) {
//     this.socket.emit('new-videocall', users);
//   }
//   getVideoCall() {
//     let observable = new Observable(observer => {
//       this.socket = io(this.ChatURL);
//       this.socket.on('getvideocall', (data) => {
//         observer.next(data);
//       });
//       return () => {
//         this.socket.disconnect();
//       };
//     });
//     return observable;
//   }
//   calltogetpeerid(users){
//     this.socket.emit('new-peerID', users);
//   }
//
//   getPeerID() {
//     let observable = new Observable(observer => {
//       this.socket = io(this.ChatURL);
//       this.socket.on('getPeerID', (data) => {
//         observer.next(data);
//       });
//       return () => {
//         this.socket.disconnect();
//       };
//     });
//     return observable;
//   }
//   getMessages() {
//   let observable = new Observable(observer => {
//         this.socket = io(this.ChatURL);
//
//     this.socket.on('message', (data) => {
//       console.log(data);
//       observer.next(data);
//     });
//
//     return () => {
//       this.socket.disconnect();
//     };
//   })
//   return observable;
// }
// // getMessages() {
//   //   let observable = new Observable(observer => {
//   //     this.socket = io(this.ChatURL);
//   //     this.socket.on('message', (data) => {
//   //       observer.next(data);
//   //       console.log(data);
//   //     });
//   //     return () => {
//   //       this.socket.disconnect();
//   //     };
//   //   });
//   //   return observable;
//   // }
//
//   NewUserLogedIn(UserId){
//     //this.socket.emit('add-User', UserId);
//   }
//
//   getUserStatus() {
//     let observable = new Observable(observer => {
//       this.socket = io(this.ChatURL);
//       this.socket.on('UserStatus', (data) => {
//         observer.next(data);
//       });
//       return () => {
//         this.socket.disconnect();
//       };
//     });
//     return observable;
//   }
//
//   setOnlineUser(userid){
//     this.socket.emit('getUserStatus', userid);
//
//   }
//
//   UserGetOffline(UserId){
//     this.socket.emit('Remove-User', UserId);
//   }
//
//   getOflineUser() {
//     let observable = new Observable(observer => {
//       this.socket = io(this.ChatURL);
//       this.socket.on('OfflineUser', (data) => {
//         observer.next(data);
//       });
//       return () => {
//         this.socket.disconnect();
//       };
//     });
//     return observable;
//   }
//
//   getChatUserData(userid,onlinestatus){
//     return this._customAuthHttp.get(this.URI + '/Getchatuserdata/' + userid+"/"+onlinestatus)
//   }
//
//   sendNotification(message){
//     this.socket.emit('Mail-Notify', message);
//   }
//
//   getNotification() {
//     let observable = new Observable(observer => {
//       this.socket = io(this.ChatURL);
//       this.socket.on('getNotification', (data) => {
//         observer.next(data);
//       });
//       return () => {
//         this.socket.disconnect();
//       };
//     });
//     return observable;
//   }
//
//   public getChatUserList(searchParam){
//
//     return this._customAuthHttp.post(this.Mongo_URL+"user/contacts",searchParam)
//       .map((res:Response) => res.json());
//   }
//
//   public saveMessageToDb(message){
//     return this._customAuthHttp.post(this.Mongo_URL+"chat",message)
//       .map((res:Response) => res.json());
//   }
//
//   public getMessagesFromDb(searchParams){
//     return this._customAuthHttp.post(this.Mongo_URL+"chat/getchatmsg",searchParams)
//       .map((res:Response) => res.json());
//   }
//
//   public updateContacts(contact){
//     return this._customAuthHttp.put(this.Mongo_URL+"user/contacts",contact)
//       .map((res:Response) => res.json());
//   }

// }
