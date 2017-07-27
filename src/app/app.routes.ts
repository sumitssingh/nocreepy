/**
 * Created by sumitsingh on 15/07/17.
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
// import { DashboardComponent } from './web-content/dashboard/dashboard.component';
// import {LoginComponent} from "./login/login.component";

export const routes: Routes =
  [
    {path: '', loadChildren: './auth/auth.module#AuthModule'},
    {path: 'web', loadChildren: './web-content/web-content.module#WebContentModule'},
    {path: 'dashboard', loadChildren: 'app/web-content/dashboard/dashboard.module#DashboardModule'},
    {path: '**', component: CommingSoonComponent},

  ];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);










