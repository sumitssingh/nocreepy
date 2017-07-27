/**
 * Created by sumitsingh on 15/07/17.
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
// import { DashboardRoute } from './dashboard.route';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { HttpModule, Http } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, APP_CONFIG } from '../../../appConfig/Iconfig';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PersonalComponent } from './personal/personal.component';
import { DashboardComponent } from './dashboard.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDatepickerModule } from '@angular/material';
import { JwtHelper, AuthConfig } from 'angular2-jwt';

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
    path: '',
    component: DashboardComponent,
    children: [
      {path: 'about', component: AboutComponent},
      {path: 'personal', component: PersonalComponent},
      {path: 'gallery', component: GalleryComponent},
    ]
  },
];

@NgModule({
  imports:
    [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AngularMultiSelectModule,
      // BrowserAnimationsModule,
      MdButtonModule,
      MdCheckboxModule,
      MdDatepickerModule,
      RouterModule.forChild(routes)
    ],
  declarations:
    [
      AboutComponent,
      DashboardComponent,
      PersonalComponent,
      GalleryComponent,
    ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  exports: [ ]
})
export class DashboardModule {
  constructor() {
  }
}
