import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
const BASEURL = 'http://localhost:8088';

@Injectable()
export class OfficeService {
  constructor(private http: HttpClient) {

  }

  getAllOfiice(): Observable<any> {
    return this.http.get(`${BASEURL}/api/offices`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
