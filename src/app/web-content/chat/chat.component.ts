// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ChatService } from './chat.Service';
//
// @Component({
//   moduleId: module.id,
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css'],
//   providers: [ ChatService ],
// })
//
// export class ChatComponent implements OnInit, OnDestroy {
//   messages = [];
//   connection;
//   message;
//   user;
//
//   constructor(private chatService: ChatService) {}
//
//   sendMessage(){
//     this.chatService.sendMessage(this.message, this.user);
//     this.message = '';
//   }
//   addUser(){
//     this.chatService.addUser(this.user);
//     // this.user = '';
//   }
//   ngOnInit() {
//     this.connection = this.chatService.getMessages().subscribe(message => {
//       this.messages.push(message);
//     })
//   }
//
//   ngOnDestroy() {
//     this.connection.unsubscribe();
//   }
// }




// import { Component, Input, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User } from './chat.model';
import { ChatService } from './chat.Service';


@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ ChatService ],
})
export class ChatComponent implements OnInit {
  public messages: any = [];
  connection;
  data: any;
  message;
  constructor(private chatService: ChatService, public user: User) {}
    ngOnInit() {
      this.chatService.getMessages().subscribe(message => {
        this.messages.push(message);
        console.log(message);
        alert(message);
      });
      this.chatService.addUser();
    }

  sendMsg(message, to) {
    this.messages.push({'text': message})
    console.log(this.message);
    this.chatService.sendMessage( message, to);
    this.message = '';
  }

  sendMessage() {
    this.chatService.sendMessage(this.message, this.user);
    this.message = '';
  }

  // ngOnDestroy() {
  //   this.connection.unsubscribe();
  // }
}
