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

  user: any = {};
  constructor(public router: Router, public registrationService: RegistrationService) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('userVM'));
    this.getStudentRegistration();
  }
  nav(url: String) {
    this.router.navigate(['tabs/tab1/' + url]);
  }

  getStudentRegistration() {
    this.registrationService.getRegistrations(this.user.id, this.user.role).subscribe(it => {
      const date = new Date();

      const dateStr = this.buidDateStr(date);


      this.registrations = it.filter(it2 => {

        // console.log(parseInt(it2.workforce.date) > parseInt(dateStr))
        return (parseInt(it2.workforce.date, 10) > parseInt(dateStr, 10) && it2.state !== 'end');
      });
    });
  }

  buidDateStr(date) {
    let dateStr = date.getFullYear() + '';
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month.toString().length < 2 ? '0' + month : month;
    day = day.toString().length < 2 ? '0' + day : day;
    dateStr = dateStr + month + day;

    return dateStr;

  }
}
