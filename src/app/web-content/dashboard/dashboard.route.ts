/**
 * Created by sumitsingh on 15/07/17.
 */

import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AboutComponent } from './about/about.component';

const routes = [
  {   path: '',
    component: DashboardComponent,
    children: [
      { path: 'about', component: AboutComponent},
    ]
  },
];

export const DashboardRoute = RouterModule.forChild(routes);
