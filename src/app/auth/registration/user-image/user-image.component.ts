import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';

const URL = 'http://localhost:3080/auth/profile/upload/';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css'],
})
export class UserImageComponent implements OnInit {
  private jwtHelper: JwtHelper;
  private userId: string;
  private URL: string;
  userImage: any[] = [];
  constructor(jwtHelper: JwtHelper) {this.jwtHelper = jwtHelper;}


  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // const token = sessionStorage.getItem('jwt');
    //  let user = this.jwtHelper.decodeToken(token);
    //  this.userId = user._id;
    //  sessionStorage.setItem('userId', this.userId);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  public uploader:FileUploader = new FileUploader({url: 'http://localhost:3080/auth/profile/upload/' + sessionStorage.getItem('userId')});

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    this.userImage.push(data);
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = JSON.parse(response); //error server response
  }
}
