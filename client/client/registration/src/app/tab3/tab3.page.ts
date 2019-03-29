import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user = JSON.parse(localStorage.getItem('userVM'));
  constructor(public auth: AuthService, public router: Router) {

  }
  logout() {
    this.auth.clearToken();
    this.router.navigate(['']);
  }
}
