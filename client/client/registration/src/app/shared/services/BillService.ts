import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UrlConfig } from './url.config';
const BASEURL = UrlConfig.BASEURL;

@Injectable()
export class BillService {
  constructor(private http: HttpClient) {

  }

  applyBill(bill): any {
    return this.http.post(`${BASEURL}/api/apply_bill`, bill);
  }

  updateBill(bill) {
    return this.http.post(`${BASEURL}/api/update_bill`, bill);
  }

  userBills(id, role): Observable<any[]> {
    return this.http.get<any[]>(`${BASEURL}/api/user_bill?id=${id}&role=${role}`);
  }
}
