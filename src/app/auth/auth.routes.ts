/**
 * Created by sumitsingh on 15/07/17.
 */
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from './login/login.component';
import { PersonalDetailComponent } from "./registration/personal-detail/personal-detail.component";
// import { RegisterComponent } from "./registration/register.component";
import { QuickSignupComponent } from './registration/quick-signup/quick-signup.component';
import { UserImageComponent } from './registration/user-image/user-image.component';
// import { TeamComponent } from "./team/team.component";
// import { ProfileComponent } from "./login/profile.component";
// import { SmeFormComponent } from "./register/forms/sme/sme-form.component";
// import { ContactUsComponent } from "./contact-us/contact-us.component";
// import { UserRegisterComponent } from "./registration/user-register/user-register.component";
// import { IndexComponent } from "./home/index.component";

export const routes: Routes =
  [
    {   path: '',
      component: AuthComponent,
      children: [
        // {path: '', component: LoginComponent},
        {path: '', component: QuickSignupComponent},
        {path: 'register/personaldetail', component: PersonalDetailComponent},
        {path: 'register/upload', component: UserImageComponent},
        // {path: 'contactus', component: ContactUsComponent},
        // {path: 'aboutus', component: AboutComponent},
        // {path: 'register/:activeIndex', component: RegisterComponent},
        // {path: 'register', component: RegisterComponent},
        // {path: 'userRegister', component: UserRegisterComponent},
        // {path: 'team', component: TeamComponent},
        // {path: 'pricing', component: PricingComponent},
        // {path: 'login', loadChildren: 'app/web/login/login.module#LoginModule'},
        // {path: 'login/:token', loadChildren: 'app/web/login/login.module#LoginModule'},
        // {path: 'package',  loadChildren: 'app/share/package/package.module#PackageModule'},
        // {path: 'pricing',  loadChildren: 'app/share/pricing/pricing.module#PricingModule'},
      ]
    },


  ];

export const AuthRoute = RouterModule.forChild(routes);
