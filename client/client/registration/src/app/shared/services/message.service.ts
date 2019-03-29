import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UrlConfig } from './url.config';
const BASEURL = UrlConfig.BASEURL;

@Injectable()
export class MessageService {
    constructor(private http: HttpClient) {

    }

    //   getAllOfiice(): Observable<any> {
    //     return this.http.get(`${BASEURL}/api/offices`, {
    //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //     });
    //   }
    getContacts(userId): Observable<any[]> {
        return this.http.get<any[]>(`${BASEURL}/api/contacts?userId=${userId}`);
    }
    getCurrentMessages(userId: any, contactId: any) {
        return this.http.get<any[]>(`${BASEURL}/api/current_messages?userId=${userId}&contactId=${contactId}`);
    }

    addMessage(message): Observable<any> {
        return this.http.post(`${BASEURL}/api/message`, message);
    }
}
