/**
 * Created by sumitsingh on 15/07/17.
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { WebContentRoute } from './web-content.route';
import { HttpModule, Http } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, APP_CONFIG } from '../../appConfig/Iconfig';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SocialComponent } from './social/social.component';
import { MatchComponent } from './social/social.component';
import { WebContentComponent } from './web-content.component';
import { JwtHelper, AuthConfig } from 'angular2-jwt';
// import { SocketIoModule, SocketIoConfig } from 'ng2-socket-io';
import { SwipeCardsModule } from '../../custom-directives/ng2-swipe-cards/ng2-swipe-cards.module';
import { PaymentComponent } from './payment/payment.component';
import { MaterialModule, MdDialogModule, MdNativeDateModule } from '@angular/material';
import { MdDatepickerModule } from '@angular/material';
import { ChatComponent } from './chat/chat.component';


// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

export function appConfig() {
  return new IConfig('');
}
export function jwtHelper() {
  return new JwtHelper();
}
export function test() {
  new AuthConfig({
    tokenName: 'jwt',
    noJwtError: true,
    globalHeaders: [{'Content-Type': 'application/json'}]
  });
}
const routes: Routes = [

  {
    path: '', component: WebContentComponent,
    children: [
      {path: 'social', component: SocialComponent},
      {path: 'payment', component: PaymentComponent},
      {path: 'chat', component: ChatComponent},
    ]
  },
  ];

@NgModule({
  imports:
    [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      SwipeCardsModule,
      MdDialogModule,
      // MaterialModule,
      MdNativeDateModule,
      MdDatepickerModule,
      // SocketIoModule.forRoot(config),
      RouterModule.forChild(routes)
    ],
  declarations:
    [
      WebContentComponent,
      SocialComponent,
      PaymentComponent,
      ChatComponent,
      // DashboardComponent,
    ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  exports: [ ]
})
export class WebContentModule {
  constructor() {
  }
}
