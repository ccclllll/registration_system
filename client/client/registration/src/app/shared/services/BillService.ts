import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
const BASEURL = 'http://localhost:8088';

@Injectable()
export class BillService {
  constructor(private http: HttpClient) {

  }

  applyBill(bill) {
    return this.http.post(`${BASEURL}/api/apply_bill`, bill);
  }

  updateBill(bill) {
    return this.http.post(`${BASEURL}/api/update_bill`, bill);
  }

  userBills(id, role) {
    return this.http.get(`${BASEURL}/api/user_bill?id=${id}&role=${role}`);
  }
}
