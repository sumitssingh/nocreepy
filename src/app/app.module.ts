import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { AppRoutes } from './app.routes';
import { BlockUIModule } from 'ng-block-ui';
import { HttpModule, Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocalJWT } from '../services/local-jwt/local-jwt';
import { JwtHelper, AuthHttp, AuthConfig } from 'angular2-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { IConfig, APP_CONFIG} from '../appConfig/Iconfig';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthService } from '../services/auth.service';
import { subscriptionService } from '../services/subscription.service';
import { customAuthHttp } from '../services/local-authhttp/local-authhttp';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SocketIoModule, SocketIoConfig } from 'ng2-socket-io';

// const config: SocketIoConfig = { url: 'http://localhost:3000'};
// import { WebContentComponent } from './web-content/web-content.component';
// import { DashboardComponent } from './web-content/dashboard/dashboard.component';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
// import { Routes, RouterModule } from '@angular/router';
// import { AuthComponent } from './auth/auth.component';
// import { SwipeCardsModule } from '../custom-directives/ng2-swipe-cards/ng2-swipe-cards.module';


export function appConfig() {
  return new IConfig('');
}
export function test() {
  return new JwtHelper();
}
export function test2(http: Http) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'jwt',
    tokenGetter: (() => sessionStorage.getItem('jwt')),
    noJwtError: true,
    globalHeaders: [{'Content-Type':'application/json'}]
  }), http);
}

// export const routes: Routes =
//   [
//     // {path: '', loadChildren: 'app/web-content/web-content.module#WebContentModule'},
//     {path: '', loadChildren: './auth/auth.module#AuthModule'},
//     // {path: 'login', loadChildren: 'app/product/product.module#ProductModule'},
//     // {path: 'login', loadChildren: 'app/auth/login/login.module#LoginModule'},
//     {path: 'product', loadChildren: 'app/web-content/web-content.module#WebContentModule'},
//
//     {path: '**', component: CommingSoonComponent},
//
//   ];
// const routerModule = RouterModule.forRoot(routes);
// export function createTranslateLoader(http: Http) {
//   return new TranslateStaticLoader(http, './assets/i18n', '.json');
// }

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegistrationComponent,
    CommingSoonComponent,
    // SwipeCardsModule,
    // WebContentComponent,
    // AuthComponent,
    // DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // SwipeCardsModule,
    // routerModule,
    AppRoutes,
    HttpModule,
    BlockUIModule,
    BrowserAnimationsModule,
    // SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    customAuthHttp,
    AuthService,
    LocalJWT,
    subscriptionService,
    JwtHelper,
    {
      provide: APP_CONFIG, useFactory: (appConfig),
    },

    { provide: JwtHelper,
      useFactory: (test),
      deps: []
    },

    { provide: AuthHttp,
      useFactory: (test2),
      deps: [Http]
    },

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
