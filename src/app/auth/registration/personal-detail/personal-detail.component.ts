import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { subscriptionService } from '../../../../services/subscription.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AclService } from '../../../../services/acl.service';
import { Response } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { JwtHelper } from 'angular2-jwt';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class PersonalDetailComponent implements OnInit {

  model: any = {};
  user: any = {};
  private userId: string;
  private data: any;
  private jwtHelper: JwtHelper;
  private message: string;
  loading = false;
  interestedin = {}
  intent = []
  language = []
  personality = []
  interests = []
  height = []
  bodyType = []
  doYouOwnACar = []
  education = []
  educationIn = []
  doYouWantChildren = []
  maritalStatus = []
  longestRelationship = []
  doYouHaveChildren = []
  doYouSmoke = []
  doYouDrink = []
  doYouDoDrugs = []
  religion = []
  profession = []
  doYouHavePets = []
  ambitious = []
  selectedItems = [];
  interestedinSettings = {};
  intentSettings = {};
  heightSettings = {};
  bodyTypeSettings = {};
  doYouOwnACarSettings = {};
  educationSettings = {};
  educationInSettings = {};
  languageSettings = {};
  doYouWantChildrenSettings = {};
  maritalStatusSettings = {};
  longestRelationshipSettings = {};
  doYouHaveChildrenSettings = {};
  doYouSmokeSettings = {};
  doYouDrinkSettings = {};
  doYouDoDrugsSettings = {};
  religionSettings = {};
  doYouHavePetsSettings = {};
  personalitySettings = {};
  ambitiousSettings = {};
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
    this.model = {
      'interestedin': [],
      'intent': [],
      'language': [],
      'personality': []
    }
    this.interestedin = [
      {'id': 1, 'itemName': 'Male'},
      {'id': 2, 'itemName': 'Female'}
      ];
    this.intent = [
      {'id': 1, 'itemName': 'Friends'},
        {'id': 2, 'itemName': 'Dating'},
          {'id': 3, 'itemName': 'Relationship'},
            {'id': 4, 'itemName': 'Marriage'},
              {'id': 5, 'itemName': 'No string'}
    ];
    this.height = [
      { 'id': 1, 'itemName': '4"0"(<122cm' },
      { 'id': 2, 'itemName': '4"1"(124cm)' },
      { 'id': 3, 'itemName': '4"2"(127cm)' },
      { 'id': 4, 'itemName': '4"3"(130cm)' },
      { 'id': 5, 'itemName': '4"4"(132cm)' },
      { 'id': 6, 'itemName': '4"5"(135cm)' },
      { 'id': 7, 'itemName': '4"6"(137cm)' },
      { 'id': 8, 'itemName': '4"7"(140cm)' },
      { 'id': 9, 'itemName': '4"8"(142cm)' },
      { 'id': 10, 'itemName': '4"9"(145cm)' },
      { 'id': 11, 'itemName': '4"10"(147cm)' },
      { 'id': 12, 'itemName': '4"11"(150cm)' },
      { 'id': 13, 'itemName': '5"0"(152cm)' },
      { 'id': 14, 'itemName': '5"1"(155cm)' },
      { 'id': 15, 'itemName': '5"2"(157cm)' },
      { 'id': 16, 'itemName': '5"3"(160cm)' },
      { 'id': 17, 'itemName': '5"4"(163cm)' },
      { 'id': 18, 'itemName': '5"5"(165cm)' },
      { 'id': 19, 'itemName': '5"6"(168cm)' },
      { 'id': 20, 'itemName': '5"7"(170cm)' },
      { 'id': 21, 'itemName': '5"8"(173cm)' },
      { 'id': 22, 'itemName': '5"9"(175cm)' },
      { 'id': 23, 'itemName': '5"10"(178cm)' },
      { 'id': 24, 'itemName': '5"11"(180cm)' },
      { 'id': 25, 'itemName': '6"0"(183cm)' },
      { 'id': 26, 'itemName': '6"1"(185cm)' },
      { 'id': 27, 'itemName': '6"2"(188cm)' },
      { 'id': 28, 'itemName': '6"3"(191cm)' },
      { 'id': 29, 'itemName': '6"4"(193cm)' },
      { 'id': 30, 'itemName': '6"5"(196cm)' },
      { 'id': 31, 'itemName': '6"6"(198cm)' },
      { 'id': 32, 'itemName': '6"7"(201cm)' },
      { 'id': 33, 'itemName': '6"8"(203cm)' },
      { 'id': 34, 'itemName': '6"9"(206cm)' },
      { 'id': 35, 'itemName': '6"10"(208cm)' },
      { 'id': 36, 'itemName': '6"11"(211cm)' },
      { 'id': 37, 'itemName': '7"0"(>213cm)' }
    ];
    this.bodyType = [
      { 'id': 1, 'itemName': 'Prefer Not To Say' },
      { 'id': 2, 'itemName': 'Thin' },
      { 'id': 3, 'itemName': 'Average' },
      { 'id': 4, 'itemName': 'Athletic' },
      { 'id': 5, 'itemName': 'Slightly overweight' },
      { 'id': 6, 'itemName': 'Big' }
    ];
    this.doYouOwnACar = [
      {'id': 1, 'itemName': 'Prefer Not To Say' },
      {'id': 2, 'itemName': 'Yes' },
      {'id': 3, 'itemName': 'No' }
    ];
    this.education = [
      {'id': 1, 'itemName': 'High school' },
      {'id': 2, 'itemName': 'Some College' },
      {'id': 3, 'itemName': 'Some University' },
      {'id': 4, 'itemName': 'Associates Degree' },
      {'id': 5, 'itemName': 'Bachelors Degree' },
      {'id': 6, 'itemName': 'Masters Degree' },
      {'id': 7, 'itemName': 'Post Doctoral' },
      {'id': 8, 'itemName': 'Graduate' },
    ];
    this.educationIn = [
      {'id': 1, 'itemName': 'Advertising / Marketing'},
      {'id': 2, 'itemName': 'Administrative services'},
      {'id': 3, 'itemName': 'Architecture'},
      {'id': 4, 'itemName': 'Arts'},
      {'id': 5, 'itemName': 'Commerce'},
      {'id': 6, 'itemName': 'Computers / IT'},
      {'id': 7, 'itemName': 'Education'},
      {'id': 8, 'itemName': 'Engineering / Technology'},
      {'id': 9, 'itemName': 'Fashion'},
      {'id': 10, 'itemName': 'Finance'},
      {'id': 11, 'itemName': 'Fine Arts'},
      {'id': 12, 'itemName': 'Home Science'},
      {'id': 13, 'itemName': 'Law'},
      {'id': 14, 'itemName': 'Management'},
      {'id': 15, 'itemName': 'Medicine'},
      {'id': 16, 'itemName': 'Nursing / Health Sciences'},
      {'id': 17, 'itemName': 'Office administration'},
      {'id': 18, 'itemName': 'Science'},
      {'id': 19, 'itemName': 'Shipping'},
      {'id': 20, 'itemName': 'Travel & Tourism'},
      {'id': 21, 'itemName': 'Other'},
    ];
    this.language = [
      {'id': 1, 'itemName': 'Arabic'},
      {'id': 2, 'itemName': 'Bengali'},
      {'id': 3, 'itemName': 'Chinese'},
      {'id': 4, 'itemName': 'Dutch'},
      {'id': 5, 'itemName': 'English'},
      {'id': 6, 'itemName': 'French'},
      {'id': 7, 'itemName': 'German'},
      {'id': 8, 'itemName': 'Gujarati'},
      {'id': 9, 'itemName': 'Hebrew'},
      {'id': 10, 'itemName': 'Hindi'},
      {'id': 11, 'itemName': 'Italian'},
      {'id': 12, 'itemName': 'Japanese'},
      {'id': 13, 'itemName': 'Norwegian'},
      {'id': 14, 'itemName': 'Portuguese'},
      {'id': 15, 'itemName': 'Persian'},
      {'id': 16, 'itemName': 'Russian'},
      {'id': 17, 'itemName': 'Spanish'},
      {'id': 18, 'itemName': 'Swedish'},
      {'id': 19, 'itemName': 'Tagalog'},
      {'id': 20, 'itemName': 'Tamil'},
      {'id': 21, 'itemName': 'Telgu'},
      {'id': 22, 'itemName': 'Urdu'},
      {'id': 23, 'itemName': 'Other'},
    ];
    this.doYouWantChildren = [
      {'id': 1, 'itemName': 'Prefer not to day'},
      {'id': 2, 'itemName': 'Do not want children'},
      {'id': 3, 'itemName': 'Undecided'},
      {'id': 4, 'itemName': 'Want children'},
    ];
    this.maritalStatus = [
      {'id': 1, 'itemName': 'Single'},
      {'id': 2, 'itemName': 'Married'},
      {'id': 3, 'itemName': 'Livein Together'},
      {'id': 4, 'itemName': 'Divorced'},
      {'id': 5, 'itemName': 'Widowed'},
      {'id': 6, 'itemName': 'Separated'},
    ];
    this.longestRelationship = [
      {'id': 1, 'itemName': 'Under 1 year'},
      {'id': 2, 'itemName': 'Over 1 year'},
      {'id': 3, 'itemName': 'Over 2 year'},
      {'id': 4, 'itemName': 'Over 3 year'},
      {'id': 5, 'itemName': 'Over 4 year'},
      {'id': 6, 'itemName': 'Over 5 year'},
      {'id': 7, 'itemName': 'Over 6 year'},
      {'id': 8, 'itemName': 'Over 7 year'},
      {'id': 9, 'itemName': 'Over 8 year'},
      {'id': 10, 'itemName': 'Over 9 year'},
      {'id': 11, 'itemName': 'Over 10 year'},
    ];
    this.doYouHaveChildren = [
      {'id': 1, 'itemName': 'Prefer not to say'},
      {'id': 2, 'itemName': 'Yes'},
      {'id': 3, 'itemName': 'No'},
      {'id': 4, 'itemName': 'All my children are above 18'},
    ];
    this.doYouSmoke = [
      {'id': 1, 'itemName': 'Prefer not to say'},
      {'id': 2, 'itemName': 'No'},
      {'id': 3, 'itemName': 'Occasionally'},
      {'id': 4, 'itemName': 'Yes'},
    ];
    this.doYouDrink = [
      {'id': 1, 'itemName': 'Prefer not to say'},
      {'id': 2, 'itemName': 'No'},
      {'id': 3, 'itemName': 'Occasionally'},
      {'id': 4, 'itemName': 'Yes'},
    ];
    this.doYouDoDrugs = [
      {'id': 1, 'itemName': 'Prefer not to say'},
      {'id': 2, 'itemName': 'No'},
      {'id': 3, 'itemName': 'Occasionally'},
      {'id': 4, 'itemName': 'Yes'},
    ];
    this.religion = [
      {'id': 1, 'itemName': 'Non-religious'},
      {'id': 2, 'itemName': 'Spiritual'},
      {'id': 3, 'itemName': 'Muslim'},
      {'id': 4, 'itemName': 'Jewish'},
      {'id': 5, 'itemName': 'Catholic'},
      {'id': 6, 'itemName': 'Buddhist'},
      {'id': 7, 'itemName': 'Hindu'},
      {'id': 8, 'itemName': 'Anglican'},
      {'id': 9, 'itemName': 'Sikh'},
      {'id': 10, 'itemName': 'Methodist'},
      {'id': 11, 'itemName': 'Christian - other'},
      {'id': 12, 'itemName': 'Baptist'},
      {'id': 13, 'itemName': 'Lutheran'},
      {'id': 14, 'itemName': 'Presbyterian'},
      {'id': 15, 'itemName': 'Other'},
    ];
    this.doYouHavePets = [
      {'id': 1, 'itemName': 'Prefer not to say'},
      {'id': 2, 'itemName': 'Cat'},
      {'id': 3, 'itemName': 'Dog'},
      {'id': 4, 'itemName': 'Cat and Dogs'},
      {'id': 5, 'itemName': 'Birds'},
      {'id': 6, 'itemName': 'Other'},
    ];
    this.personality = [
      {'id': 1, 'itemName': 'Adventurer'},
      {'id': 2, 'itemName': 'Animal Lover'},
      {'id': 3, 'itemName': 'Artsy'},
      {'id': 4, 'itemName': 'Athletic'},
      {'id': 5, 'itemName': 'Beach Bum'},
      {'id': 6, 'itemName': 'Blogger'},
      {'id': 7, 'itemName': 'Blue Collar'},
      {'id': 8, 'itemName': 'Bookworm'},
      {'id': 9, 'itemName': 'Brogrammer'},
      {'id': 10, 'itemName': 'Chef'},
      {'id': 11, 'itemName': 'Class Clown'},
      {'id': 12, 'itemName': 'Club Kid'},
      {'id': 13, 'itemName': 'Coffee Snob'},
      {'id': 14, 'itemName': 'Comic Nerd'},
      {'id': 15, 'itemName': 'Crafty'},
      {'id': 16, 'itemName': 'Daredevil'},
      {'id': 17, 'itemName': 'Diva'},
      {'id': 18, 'itemName': 'Fashionista'},
      {'id': 19, 'itemName': 'Film/Tv Junkie'},
      {'id': 20, 'itemName': 'Free Thinker'},
      {'id': 21, 'itemName': 'Foodie'},
      {'id': 22, 'itemName': 'Geek'},
      {'id': 23, 'itemName': 'Gamer'},
      {'id': 24, 'itemName': 'Hedonist'},
      {'id': 25, 'itemName': 'Hipster'},
      {'id': 26, 'itemName': 'Hippie'},
      {'id': 27, 'itemName': 'Homebody'},
      {'id': 28, 'itemName': 'Hopeless'},
      {'id': 29, 'itemName': 'Romantic'},
      {'id': 30, 'itemName': 'Humanist'},
      {'id': 31, 'itemName': 'Intellectual'},
      {'id': 32, 'itemName': 'Maker'},
      {'id': 33, 'itemName': 'Music Snob'},
      {'id': 34, 'itemName': 'Night Owl'},
      {'id': 35, 'itemName': 'Nomad'},
      {'id': 36, 'itemName': 'Photographer'},
      {'id': 37, 'itemName': 'Player'},
      {'id': 38, 'itemName': 'Poet'},
      {'id': 39, 'itemName': 'Princes'},
      {'id': 40, 'itemName': 'Professional'},
      {'id': 41, 'itemName': 'Rockstar'},
      {'id': 42, 'itemName': 'Starving Artist'},
      {'id': 43, 'itemName': 'Straight Edge'},
      {'id': 44, 'itemName': 'Traveler'},
      {'id': 45, 'itemName': 'Techie'},
      {'id': 46, 'itemName': 'Treehugger'},
      {'id': 47, 'itemName': 'Sapiophile'},
      {'id': 48, 'itemName': 'Tattoed/Pierced'},
      {'id': 49, 'itemName': 'Vegetarian'},
      {'id': 50, 'itemName': 'Vegan'},
      {'id': 51, 'itemName': 'Yogi'},
      {'id': 52, 'itemName': 'Yupi'},
    ];
    this.ambitious = [
      {'id': 1, 'itemName': 'Not ambitious'},
      {'id': 2, 'itemName': 'Somewhat ambitious'},
      {'id': 3, 'itemName': 'Ambitious'},
      {'id': 4, 'itemName': 'Very Ambitious'},
    ];
    // this.selectedItems = [];
    this.interestedinSettings = {
      singleSelection: false,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.intentSettings = {
      singleSelection: false,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.heightSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.bodyTypeSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.doYouOwnACarSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.educationSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.educationInSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.languageSettings = {
      singleSelection: false,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.doYouWantChildrenSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.maritalStatusSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.longestRelationshipSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.doYouHaveChildrenSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.doYouSmokeSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.doYouDrinkSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.doYouDoDrugsSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.religionSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.doYouHavePetsSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.personalitySettings = {
      singleSelection: false,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
    this.ambitiousSettings = {
      singleSelection: true,
      enableSearchFilter: false,
      classes: 'myClass custom-class'
    }
  }
  register() {
    this.loading = true;
    console.log(this.user.height[0].itemName);
    for (let i = 0; i <= this.user.interestedin.length - 1; i++ ) {
      this.model.interestedin.push(this.user.interestedin[i].itemName);
    }
    for (let i = 0; i <= this.user.intent.length - 1; i++ ) {
      this.model.intent.push(this.user.intent[i].itemName);
    }
    for (let i = 0; i <= this.user.language.length - 1; i++ ) {
      this.model.language.push(this.user.language[i].itemName);
    }
    for (let i = 0; i <= this.user.personality.length - 1; i++ ) {
      this.model.personality.push(this.user.personality[i].itemName);
    }
        this.model.height = this.user.height[0].itemName;
          this.model.bodyType = this.user.bodyType[0].itemName;
            this.model.doYouOwnACar = this.user.doYouOwnACar[0].itemName;
              this.model.education = this.user.education[0].itemName;
                this.model.educationIn = this.user.educationIn[0].itemName;
                    this.model.doYouWantChildren = this.user.doYouWantChildren[0].itemName;
                      this.model.maritalStatus = this.user.maritalStatus[0].itemName;
                        this.model.longestRelationship = this.user.longestRelationship[0].itemName;
                          this.model.doYouHaveChildren = this.user.doYouHaveChildren[0].itemName;
                            this.model.doYouSmoke = this.user.doYouSmoke[0].itemName;
                              this.model.doYouDrink = this.user.doYouDrink[0].itemName;
                                this.model.doYouDoDrugs = this.user.doYouDoDrugs[0].itemName;
                                  this.model.religion = this.user.religion[0].itemName;
                                    this.model.doYouHavePets = this.user.doYouHavePets[0].itemName;
                                      this.model.ambitious = this.user.ambitious[0].itemName;
    console.log(this.model);
      this.subscriptionservice.signup2(this.model)
      // .map((res:Response)=>(res.json()))
        .subscribe(
          data => {
            console.log(data);
            this.loading = false;
            this.data=data.json();
            if(this.data.status)
            {
              this.data = data;
              const token = sessionStorage.getItem('jwt');
               const user = this.jwtHelper.decodeToken(token);
               this.userId = user._id;
               sessionStorage.setItem('userId', this.userId);
              this.routers.navigateByUrl('/register/upload');
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
  onItemSelect(item:any) {
    console.log(item);
    // console.log(this.selectedItems2);
  }
}
