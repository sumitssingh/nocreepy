import {Injectable, Inject, NgZone, forwardRef} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {Router} from "@angular/router";
import {Dictionary} from "../utils/dictionary";
import {isNullOrUndefined} from "util";
import {AppComponent} from "../app/app.component";

@Injectable()
export class AclService {

  private jwt:string;
  private permission:string;
  private value:boolean;
  private permissionDictionary:any;
  static instance:AclService;
  static isCreating:Boolean = false;
  static _userId:number;
  private jwtHelper = new JwtHelper();


  constructor( ){
    if(!AclService.isCreating){
      throw new Error("Cannot call new in ACL");
    }
    this.permissionDictionary = new Dictionary();
  }

  static getInstance(){
    if(AclService.instance == null){
      AclService.isCreating = true;
      AclService.instance = new AclService();
      AclService.isCreating = false;
    }

    return AclService.instance;
  }



  public static setUserId(user_id){
    AclService._userId = user_id;
  }

  public static getUserId(){
    return AclService._userId;
  }

  public addPermissions(json:any){
    if(this.permissionDictionary.count()>0){
      this.permissionDictionary = new Dictionary();
    }

    for(let key in json) {
      if (!json.hasOwnProperty(key)) { continue; }
      this.permissionDictionary.add(json[key].toUpperCase(),json[key].toUpperCase());
    }
  }


  checkPermission(permission:string): boolean{
    if(this.permissionDictionary.keys().length==0){
      var token = sessionStorage.getItem('jwt');
      if(isNullOrUndefined(token)){
        // this.app.showError("Session is TimeOut!")
        // this.router.navigate(['/login']);
      }
      else {
        let parseddata = this.jwtHelper.decodeToken(token);
        let permissions = parseddata.permission;
        this.addPermissions(permissions);
      }
    }
    if(this.permissionDictionary.containsKey(permission.toUpperCase())){
      let val = this.permissionDictionary.getValue(permission.toUpperCase());
      if(val){
        return true;
      }
      else{
        return false;
      }
    }
    else {
      return false;
    }
  }

}
