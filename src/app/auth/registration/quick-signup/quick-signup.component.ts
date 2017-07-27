import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { subscriptionService } from "../../../../services/subscription.service"
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdDatepickerModule } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AclService } from "../../../../services/acl.service";
import { Response } from "@angular/http";
import { isNullOrUndefined } from "util";
import { JwtHelper } from "angular2-jwt";
import { AppComponent } from "../../../app.component";

@Component({
  selector: 'app-quick-signup',
  templateUrl: './quick-signup.component.html',
  styleUrls: ['./quick-signup.component.css']
})
export class QuickSignupComponent implements OnInit {

  model: any = {};
  user: any = {};
  loading = false;
  gender = [];
  private token: string;
  private data:any;
  private jwtHelper:JwtHelper;
  private message:string;
  selectedItems = [];
  dropdownSettings = {};
  constructor(private routers:Router,
              // private activatedRoute: ActivatedRoute,
              @Inject(forwardRef(() => AppComponent)) public app:AppComponent,
              public subscriptionservice:subscriptionService,
              // private chatService:ChatService,
              jwtHelper:JwtHelper) {
    this.message = null;
    // this.forgetpwd=false;
    this.jwtHelper = jwtHelper;
    // this.aclService = AclService.getInstance();
  }

  ngOnInit() {
    this.user = {
      'gender' : []
    }
    this.gender = [
      {'id': 1, 'itemName': 'Male'},
      {'id': 2, 'itemName': 'Female'},
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      text:"Select Gender",
      enableSearchFilter: false,
      classes:"myclass custom-class"
    };
  }
  register() {
    this.loading = true;
    this.model.gender = this.user.gender[0].itemName;
    console.log(this.model);
    // this.routers.navigate(['/register/personaldetail']);
    // this.loading = false;
      this.subscriptionservice.signup(this.model)
      // .map((res:Response)=>(res.json()))
          .subscribe(
              data => {
                console.log(data);
                this.loading = false;
                  this.data = data.json();
                  if (this.data.status)
                  {
                    // let token=data.token;
                    // if(token) {
                      // this.localjwt.saveJWT(token);
                      sessionStorage.setItem("jwt", this.data.token);
                    // }
                      this.data = data;
                      this.routers.navigateByUrl('/register/personaldetail');
                      this.message="Verification link has been sent your register Email address";
                      // this.messagedialouge=true;
                  }
                  else {
                      this.message="something went wrong";
                      // this.messagedialouge=true;
                  }
              },
              err =>
              {
                  // this.start=false;
                  this.message = "UserName or Password is Incorrect";
              },
          );
  }


  onItemSelect(item:any){
    console.log(item);
    // console.log(this.selectedItems2);
  }
  OnItemDeSelect(item:any){
    console.log(item);
    // console.log(this.selectedItems2);
  }
  onSelectAll(items: any){
    console.log(items);
  }
  onDeSelectAll(items: any){
    console.log(items);
  }

}
