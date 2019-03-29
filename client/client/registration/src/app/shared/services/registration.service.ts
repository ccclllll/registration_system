import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
const BASEURL = 'http://localhost:8088';

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {

  }

  addRegistration(registration): Observable<any> {
    return this.http.post(`${BASEURL}/api/registration`, registration);
  }

  getStudnetRegistration(id,role) {
    return this.http.get<any[]>(`${BASEURL}/api/registrations?id=${id}&role=${role}`);
  }

}
