import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../shared/services/registration.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('userVM'));
  history = [];
  constructor(public registrationService: RegistrationService) { }

  ngOnInit() { }
  ionViewDidEnter() {
    this.user = JSON.parse(localStorage.getItem('userVM'));

    this.getStudentRegistration();
  }
  getStudentRegistration() {
    console.log(this.user)
    this.registrationService.getRegistrations(this.user.id, this.user.role).subscribe(it => {
      // console.log(it);
      const date = new Date();

      const dateStr = this.buidDateStr(date);

      console.log(dateStr)
      this.history = it.filter(it2 => {

        // console.log(parseInt(it2.workforce.date) > parseInt(dateStr))
        return parseInt(it2.workforce.date, 10) > parseInt(dateStr, 10);
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
