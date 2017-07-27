/**
 * Created by sumitsingh on 15/07/17.
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { AuthRoute } from './auth.routes';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { Http} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { subscriptionService } from '../../services/subscription.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { MdDatepickerModule } from '@angular/material';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { QuickSignupComponent } from './registration/quick-signup/quick-signup.component';
import { PersonalDetailComponent } from './registration/personal-detail/personal-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserImageComponent } from './registration/user-image/user-image.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

@NgModule({
  imports:
    [
      AuthRoute,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AngularMultiSelectModule,
      MdDatepickerModule,
      MdNativeDateModule,
      // MaterialModule,
    ],

  declarations:
    [
      LoginComponent,
      RegistrationComponent,
      FileSelectDirective,
      AuthComponent,
      QuickSignupComponent,
      PersonalDetailComponent,
      UserImageComponent,
    ],
  providers:
    [
      subscriptionService,
    ],
  exports:
    [

    ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule {
  constructor() {
  }
}

