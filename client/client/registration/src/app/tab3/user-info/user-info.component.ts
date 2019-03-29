import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('userVM'));
  userInfo = {};
  constructor(public auth: AuthService) { }

  ionViewDidEnter() {
    this.auth.getUserById(this.user.id).subscribe(it => {
      this.userInfo = it[0];
    });
  }
  ngOnInit() { }

}
