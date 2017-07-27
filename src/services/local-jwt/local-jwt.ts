/**
 * Created by sumitsingh on 15/07/17.
 */

import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class LocalJWT {
  jwtHelper:JwtHelper;
  constructor(jwtHelper:JwtHelper){
    this.jwtHelper = jwtHelper;
  }
  parseJWT(jwt: string): any {
    var jwtDecoded = null;

    if (typeof jwt !== 'undefined' && jwt !== 'undefined' && jwt !== '') {
      // var jwtDecode = require('jwt-decode');
      try { jwtDecoded = this.jwtHelper.decodeToken(jwt); } catch(e) { jwtDecoded = null; }
    }

    return jwtDecoded;
  }

  fetchJWT(): string {
    var jwt = sessionStorage.getItem('jwt');
    console.log(jwt);
    if (typeof jwt !== 'undefined' && jwt !== 'undefined' && jwt !== '') {
      return jwt;
    }
    return null;
  }

  saveJWT(idToken: string): void {
    sessionStorage.setItem('jwt', idToken);
  }

  removeJWT(): void {
    sessionStorage.removeItem('jwt');
  }
}
