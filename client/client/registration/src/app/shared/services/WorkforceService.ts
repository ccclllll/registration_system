import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UrlConfig } from './url.config';
const BASEURL = UrlConfig.BASEURL;

@Injectable()
export class WorkforceService {
  constructor(private http: HttpClient) {

  }

  getDoctorAllWorkforce(doctorId): Observable<any[]> {
    return this.http.get<any[]>(`${BASEURL}/api/doctor_workforces?doctorId=${doctorId}`);
  }
}
