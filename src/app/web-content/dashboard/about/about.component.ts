import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { subscriptionService } from '../../../../services/subscription.service'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AclService } from '../../../../services/acl.service';
import { AuthService } from '../../../../services/auth.service';
import { Response } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { JwtHelper } from 'angular2-jwt';
import { MdDatepickerModule } from '@angular/material';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  model: any = {};
  user: any = {};
  loading = false;
  gender = [];
  toggle: boolean;
  private token: string;
  private data: any;
  private jwtHelper: JwtHelper;
  private message: string;
  selectedItems = [];
  dropdownSettings = {};
  constructor(private routers: Router,
              // private activatedRoute: ActivatedRoute,
              @Inject(forwardRef(() => AppComponent)) public app: AppComponent,
              public subscriptionservice: subscriptionService,
              public authService: AuthService,
              // private chatService:ChatService,
              jwtHelper: JwtHelper) {
    this.message = null;
    // this.forgetpwd=false;
    this.jwtHelper = jwtHelper;
    // this.aclService = AclService.getInstance();
    authService.getUser()
      .subscribe(data => {
        console.log(data);
        this.model = data;
        // this.user.gender = [
        //   {'id': 1, 'itemName': data.gender}
        // ];
        // for ( let i = 0; i <= this.gender.length; i++) {
        //   if (this.gender[i].itemName === data.gender) {
        //     this.model.gender = [
        //       {
        //         'id': this.gender[i].id,
        //         'itemName': data.gender
        //       }
        //     ]
        //     break;
        //   }
        // }
      });
  }
  ngOnInit() {
    this.toggle = true;
    this.user = {
      'gender' : []
    };
    this.gender = [
      {'id': 1, 'itemName': 'Male'},
      {'id': 2, 'itemName': 'Female'},
    ];
    // this.user.gender = [
    //   {'id': 1, 'itemName': 'Male'}
    // ];

    this.dropdownSettings = {
      singleSelection: true,
      text: 'Select Gender',
      enableSearchFilter: false,
      classes: 'myclass custom-class'
    };
  }
  register() {
    // this.loading = true;
    // this.model.gender = this.user.gender[0].itemName;
    console.log(this.model);
  }
  onItemSelect(item:any){
    console.log(item);
    // console.log(this.selectedItems2);
  }
}
