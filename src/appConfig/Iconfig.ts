/**
 * Created by sumitsingh on 15/07/17.
 */
import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken<string>('app.config');

export class IConfig {

  public APP_URL: string = 'http://localhost:3080';
  // public APP_URL:string = 'http://www.nocreepy.com:4200';
  // public APP_ID:string = '176cf052-6c15-4b05-a732-03c1eb6bede2';
  // public SUB_DOMAIN:string = 'https://*.geniebots.com';
  // public PROFILE_PICURL:string = 'http://app.genieuslabs.com/profilePics/';
  public Chat_Server_URL: string = 'http://localhost:8000';
  public NODE_URL: string = 'http://localhost:3080';
  public mongoUrl: string;
  constructor(tenantKey) {
    this.setAppUrl(tenantKey);
  }

  public setAppUrl(hostname: string)
  {
    // this.mongoUrl='http://35.154.235.185/adhigam-api/';
    // this.Chat_Server_URL ='http://35.154.235.185:8001';
    // this.mongoUrl='http://test.adhigam.com/adhigam-api/';
    // this.Chat_Server_URL ='http://test.adhigam.com:8001';
    //
    // this.mongoUrl='http://www.nocreepy.com:4200';
    // http://www.nocreepy.com:4200
    this.mongoUrl = 'http://localhost:3080';
    this.Chat_Server_URL = 'http://localhost:8000';
    //
    // this.mongoUrl='http://gst.adhigam.com/adhigam-api-v1/';
    // this.mongoUrl='http://gst.gibots.com/adhigam-api/';
    //
    // this.APP_URL = 'http://app.genieuslabs.com/laravel/public/index.php/api';
  }
}
