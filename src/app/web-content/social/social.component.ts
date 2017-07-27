import { Component, AfterViewInit,  ViewEncapsulation, ViewChild, OnInit, TemplateRef, EventEmitter, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Social } from './social';
import { SocialService } from '../../../services/social.service';
import { AclService } from '../../../services/acl.service';
import { AuthService } from '../../../services/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import * as $ from 'jquery';
import { MdDialog, MdDialogRef } from '@angular/material';
// import { Socket } from 'ng2-socket-io';
@Component({
  moduleId: module.id,
  selector: 'app-social',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './social.component.html',
  styles: ['[role="button"],\n' +
  'input[type="submit"],\n' +
  'input[type="reset"],\n' +
  'input[type="button"],\n' +
  'button {\n' +
  '  -webkit-box-sizing: content-box;\n' +
  '  -moz-box-sizing: content-box;\n' +
  '  box-sizing: content-box;\n' +
  '}\n' +
  '\n' +
  '/* Reset `button` and button-style `input` default styles */\n' +
  'input[type="submit"],\n' +
  'input[type="reset"],\n' +
  'input[type="button"],\n' +
  'button {\n' +
  '  background: none;\n' +
  '  border: 0;\n' +
  '  color: inherit;\n' +
  '  /* cursor: default; */\n' +
  '  font: inherit;\n' +
  '  line-height: normal;\n' +
  '  overflow: visible;\n' +
  '  padding: 0;\n' +
  '  -webkit-appearance: button; /* for input */\n' +
  '  -webkit-user-select: none; /* for button */\n' +
  '  -moz-user-select: none;\n' +
  '  -ms-user-select: none;\n' +
  '}\n' +
  'input::-moz-focus-inner,\n' +
  'button::-moz-focus-inner {\n' +
  '  border: 0;\n' +
  '  padding: 0;\n' +
  '}\n' +
  '\n' +
  '/* Make `a` like a button */\n' +
  '[role="button"] {\n' +
  '  color: inherit;\n' +
  '  cursor: default;\n' +
  '  display: inline-block;\n' +
  '  text-align: center;\n' +
  '  text-decoration: none;\n' +
  '  white-space: pre;\n' +
  '  -webkit-user-select: none;\n' +
  '  -moz-user-select: none;\n' +
  '  -ms-user-select: none;\n' +
  '}\n' +
  '\n' +
  '\n' +
  '/* Demo */\n' +
  '[role="button"],\n' +
  'input[type="submit"],\n' +
  'input[type="reset"],\n' +
  'input[type="button"],\n' +
  'button {\n' +
  '  background-color: #f0f0f0;\n' +
  '  border: 1px solid rgb(0, 0, 0);\n' +
  '  border: 1px solid rgba(0, 0, 0, 0.1);\n' +
  '  border-radius: 0.25em;\n' +
  '  height: 2.5em;\n' +
  '  line-height: 2.5;\n' +
  '  margin: 0.25em;\n' +
  '  padding: 0 1em;\n' +
  '  width: 14em;\n' +
  '}\n' +
  '\n' +
  'html, body {\n' +
  '  margin: 0;\n' +
  '  height: 100%;\n' +
  '  overflow: hidden;\n' +
  '}\n' +
  '\n' +
  '.footer {\n' +
  '  width: 100%;\n' +
  '  text-align: center;\n' +
  '  position: absolute;\n' +
  '  bottom: 20px;\n' +
  '}\n' +
  '\n' +
  '.left-panel {\n' +
  '  float:right;\n' +
  '  height:100%;\n' +
  '  width:100%;\n' +
  '  max-width:400px;\n' +
  '  margin-right: 200px;\n' +
  '  margin-top: 100px;\n' +
  '}\n' +
  '\n' +
  '.right-panel {\n' +
  '  float:left;\n' +
  '  height:100%;\n' +
  '  width:400px;\n' +
  '  overflow: auto;\n' +
  '}\n' +
  '\n' +
  '.card-container {\n' +
  '  margin:auto;\n' +
  '  display: flex;\n' +
  '  align-items: center;\n' +
  '  justify-content: center;\n' +
  '  flex-direction: column;\n' +
  '  height:60%;\n' +
  '  width:80%;\n' +
  '  margin:10px auto;\n' +
  '}\n' +
  '\n' +
  'sc-card {\n' +
  '  display: flex;\n' +
  '  align-items: center;\n' +
  '  justify-content: center;\n' +
  '  flex-direction: column;\n' +
  '  max-height: 320px;\n' +
  '  max-width: 320px;\n' +
  '  border-radius: 10px !important;\n' +
  '}\n' +
  '\n' +
  '.card-header span {\n' +
  '  position:absolute;\n' +
  '  top:5px;\n' +
  '  left:5px;\n' +
  '  width:30px;\n' +
  '  height:30px;\n' +
  '  text-align: center;\n' +
  '  font-weight: bold;\n' +
  '  font-size: 20px;\n' +
  '  border-radius: 15px;\n' +
  '  background-color: #E1E1E1;\n' +
  '  display: flex;\n' +
  '  align-items: center;\n' +
  '  justify-content: center;\n' +
  '}\n' +
  '\n' +
  // '.sc-card.card-heap {\n' +
  // '  height: 320px !important;\n' +
  // '  width: 320px !important;\n' +
  // '  border-radius: 10px;\n' +
  '.card-content {\n' +
  '  display: flex;\n' +
  '  align-items: center;\n' +
  '  justify-content: center;\n' +
  '  height: 100%;\n' +
  '\n' +
  '}\n' +
  '\n' +
  '.card-content img {\n' +
  '  max-width:100%;\n' +
  '  max-height:100%;\n' +
  'border-radius: 10px\n' +
  '}\n' +
  '\n' +
  '  .btn-circle {\n' +
  'width: 25px;\n' +
  'height: 30px;\n' +
  'padding: 15px 18px;\n' +
  'font-size: 24px;\n' +
  'line-height: 1.33;\n' +
  'border-radius: 35px;\n' +
'}\n' +
  '.buttons {\n' +
  '  width:100%;\n' +
  '  display: flex;\n' +
  '  align-items: center;\n' +
  '  justify-content: center;\n' +
  '  flex-direction: row;;\n' +
  '}\n' +
  '.log-container {\n' +
  '  margin:auto;\n' +
  '  width:96%;\n' +
  '  height:15%;\n' +
  '  border: 1px solid black;\n' +
  '  overflow-y: scroll;\n' +
  '}\n' +
  '\n' +
  '.log-container span {\n' +
  '  display:block;\n' +
  '  width:100%;\n' +
  '}\n' +
  '  .progress-stats {\n' +
  'height: 70px;\n' +
  'color: fff;\n' +
  'padding: 10px 0;\n' +
  'background-color: rgba(0, 0, 0, 0.14);\n' +
  'position: absolute;\n' +
  'bottom: 0;\n' +
  'width: 100%;\n' +
  'box-sizing: border-box;\n' +
  'border-bottom-left-radius: 10px;\n' +
  'border-bottom-right-radius: 10px;\n' +
'}\n'+
    '.progress-stats .card-shown {\n' +
    'width: 66.6666666667%;\n' +
'display: inline-block;\n' +
'padding-right: 15px;\n' +
'padding-left: 15px;\n' +
'box-sizing: border-box;\n' +
'float: left;\n' +
'}\n' +
'.progress-stats .card-shown-number {\n' +
  'font-size: 16px;\n' +
  'height: 20px;\n' +
  'text-transform: uppercase;\n' +
  'overflow: hidden;\n' +
  'text-overflow: ellipsis;\n' +
'}\n' +
'.progress-stats .card-shown-text {\n' +
  'font-size: 16px;\n' +
  'height: 24px;\n' +
  'overflow: hidden;\n' +
  'text-overflow: ellipsis;\n' +
'}\n' +

'.progress-stats .card-number {\n' +
  'line-height: 35px;\n' +
  'text-align: right;\n' +
  'display: inline-block;\n' +
  'width: 33.33333333%;\n' +
  'padding-right: 15px;\n' +
  'padding-left: 15px;\n' +
  'box-sizing: border-box;\n' +
'}\n'],
  providers: [SocialService, AclService],
})
export class SocialComponent implements OnInit {
  @ViewChild('cardLog') cardLogContainer: any;
  @ViewChild('tinderCardLog') tinderCardLogContainer: any;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;
  model: any = {};
  Razorpay: any;
  socket = null;
  showButtons: boolean;
  private jwtHelper: JwtHelper;
  private userId: number;
  userPosition: any = [];
  cards: any[] = [];
  cardCursor: number = 0;
  orientation: string = 'x';
  overlay: any = {
    like: {
      backgroundColor: '#28e93b'
    },
    dislike: {
      backgroundColor: '#e92828'
    }
  };
  cardLogs: any = [];
  tinderCardLogs: any = [];

  constructor(private socialService: SocialService,
              public authService: AuthService,
              public dialog: MdDialog,
              // private socket: Socket,
              jwtHelper: JwtHelper) {
    this.jwtHelper = jwtHelper;
    const token = sessionStorage.getItem('jwt');
    const user = this.jwtHelper.decodeToken(token);
    this.userId = user._id;
    const self = this;
    navigator.geolocation.getCurrentPosition(function(position){
      self.authService.updateLocation(self.userId, position)
        .subscribe(data => {
          self.socialService.getMatch()
            .subscribe(data => {
              console.log(data);
              for (let i = 0; i < data.user.length - 1; i++) {
                self.cards.push({
                  id: data.user[i]._id,
                  likeEvent: new EventEmitter(),
                  destroyEvent: new EventEmitter(),
                  username: data.user[i].username,
                  url: data.user[i].userImage[0]
                });
                console.log(self.cards);
                self.showButtons = true;
              }
            });
        });
    }, (error) => {
      console.log(error);
    });
    }
  ngOnInit() {
    const self = this;
    // this.socket = io('http://localhost:3000');
    // this.socket.on('myMatch', function (data) {
    //   console.log(data);
    //     self.openDialog()
    // })
  }
    openDialog() {
      const dialogRef = this.dialog.open(MatchComponent);
      // dialogRef.afterClosed().subscribe(result => {
        // this.selectedOption = result;
      // });
    }
  openCheckout() {
    let self = this;
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_EBd7Qkiz2LP092Zch56dtkcn',
      locale: 'auto',
      token: function (token: any) {
        console.log(token);
        self.socialService.makePayment({ stripeToken: token.id,
          stripeTokenType: token.type,
          stripeEmail: token.email })

        // self.socialService.makePayment(token)
          .subscribe(data => {
            console.log(data);
          });
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });

  }
  doPayment() {
    // declare let Stripe:any;
    const self = this;
    const options = {
      'key': 'rzp_test_5YdBFbyhqR01KI',
      'amount': 2500000,
      'name': 'ADHIGAM',
      'description': 'Subscription for Adhigam',
      'image': 'assets/index/logo/final-logo.png',
      'handler': function (response) {
      },
      'prefill': {
        'name': this.model.name,
        'email': this.model.email,
      },
      'notes': {
        'address': 'Hello World'
      },
      'theme': {
        'color': '#436FCC'
      }
    };
    $.getScript('https://checkout.razorpay.com/v1/checkout.js', function() {
      const rzp1 = new Razorpay(options);
      rzp1.open();
    });
  }

  like(like) {
    this.makeConnection(this.cards[this.cardCursor].id);
    const self = this;
    if (this.cards.length > 0) {
      self.cards[this.cardCursor++].likeEvent.emit({ like });
      // DO STUFF WITH YOUR CARD
      this.tinderCardLogs.push('callLike(' + JSON.stringify({ like }) + ')');
      this.scrollToBottom(this.tinderCardLogContainer);
    }
  }
  onCardLike(event) {

    let item = this.cards[this.cardCursor++];
    // DO STUFF WITH YOUR CARD
    this.tinderCardLogs.push('onLike(' + JSON.stringify(event) + ')');
    this.scrollToBottom(this.tinderCardLogContainer);
  }

  getKittenUrl() {
    let w = 500 - Math.floor((Math.random() * 100) + 1);
    let h = 500 - Math.floor((Math.random() * 100) + 1);
    return 'http://placekitten.com/' + w + '/' + h;
  }

  onRelease(event, card) {
    this.makeConnection(this.cards[this.cardCursor].id);
    this.cardLogs.push('onRelease(event)');
    this.scrollToBottom(this.cardLogContainer);

  }

  onAbort(event) {
    this.cardLogs.push('onAbort(event)');
    this.scrollToBottom(this.cardLogContainer);
  }

  onSwipe(event) {
    this.cardLogs.push('onSwipe(event)');
    this.scrollToBottom(this.cardLogContainer);
  }
  makeConnection(senderId) {
    this.socialService.makeConnection(senderId)
      .subscribe(data => {
        console.log(data);
      });
}
  scrollToBottom(el) {
    setTimeout(() => {
      el.nativeElement.scrollTop = el.nativeElement.scrollHeight;
    }, 50);
  }

}
@Component({
  selector: 'app-match-component',
  template: '<h1 md-dialog-title>Dialog</h1>\n'
})
export class MatchComponent {
  constructor(public dialogRef: MdDialogRef<MatchComponent>) {}
}
