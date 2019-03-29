import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UrlConfig } from './url.config';
const BASEURL = UrlConfig.BASEURL;

@Injectable()
export class AuthService {

  token: Subject<any>;


  constructor(private http: HttpClient) {
    this.token = new Subject<any>();
  }

  getToken(userVM: any): Observable<any> {

    return this.http.post(`${BASEURL}/api/login`, userVM).pipe(
      tap(it => this.handleResult(it, userVM))
    );

  }

  handleResult(it: any, userVM: any) {
    this.token.next(it);
    console.log(it);
    localStorage.setItem('token', it.token);

   // console.log(userVM.code)
    const date = (new Date()).getTime();
    localStorage.setItem('loginTime', date + '');
    localStorage.setItem('userVM', JSON.stringify(userVM));
  }

  getUser(): Observable<any> {
    return this.http.get(`${BASEURL}/api/jwt_user`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${BASEURL}/api/user?id=${id}`);
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userVM');
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.get(`${BASEURL}/api/register?username=${username}&email=${email}&password=${password}`);
  }
}
