import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  backgrounds: string[] = ['https://img02.sogoucdn.com/app/a/100520093/0e0fd862f51611ae-a90dafa354d6f346-6cc1a44a325037bd113b83a7243ce3e4.jpg'];
  loginVM = { code: '150154057', password: '123456', role: 'student' };
  constructor(public router: Router, private auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onLoggedin() {
    this.auth.getToken({ id: this.loginVM.code, password: this.loginVM.password, role: this.loginVM.role }).subscribe(
      it => {
        localStorage.setItem('isLoggedin', 'true');
        // this.navCtrl.push('TabsPage');
        this.router.navigateByUrl('tabs');
      }
    );
    console.log(this.loginVM);
  }

  // nav(page) {
  //   this.navCtrl.push(page);
  // }
}
