import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UrlConfig } from './url.config';
const BASEURL = UrlConfig.BASEURL;

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {

  }

  addRegistration(registration): Observable<any> {
    return this.http.post(`${BASEURL}/api/registration`, registration);
  }

  getRegistrations(id, role) {
    return this.http.get<any[]>(`${BASEURL}/api/registrations?id=${id}&role=${role}`);
  }

  updateRegistration(registration) {
    return this.http.post(`${BASEURL}/api/update_registration`, registration);
  }
}
