import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
userSetting: any = {};
userImage: any = [];
  constructor(public authService: AuthService) {
    authService.getUser()
    .subscribe(data => {
      console.log(data);
      this.userImage = data.userImage;
    });
    }

  ngOnInit() {
  }
  settingData() {
    console.log(this.userSetting);
  }
}
