import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../shared/services/registration.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  registrations = [];
  user = JSON.parse(localStorage.getItem('userVM'));
  constructor(public router: Router, public registrationService: RegistrationService) {

    this.getStudentRegistration();
  }
  nav(url: String) {
    this.router.navigate(['tabs/tab1/' + url]);
  }

  getStudentRegistration() {
    this.registrationService.getStudnetRegistration(this.user.id).subscribe(it => {
      console.log(it);
      const date = new Date().getTime();
      this.registrations = it.filter(it2 => {
        console.log(it2);
        return new Date(it2.date).getTime() > date;
      });
    });
  }
}
