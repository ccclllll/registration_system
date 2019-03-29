import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  backgrounds: string[] = ['../../assets/img/bg2.jpg'];
  loginVM = { code: '150154057', password: '123456', role: 'student' };
  constructor(public router: Router, private auth: AuthService, public loadingController: LoadingController,
    public alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  async onLoggedin() {
    const loading = await this.loadingController.create({
      message: '登录中',
      duration: 2000
    });
    await loading.present();
    this.auth.getToken({ id: this.loginVM.code, password: this.loginVM.password, role: this.loginVM.role }).subscribe(
      it => {
        localStorage.setItem('isLoggedin', 'true');
        // this.navCtrl.push('TabsPage');
        loading.dismiss();
        if (it.code == '-1') {
          this.presentAlert('用户名或密码错误！')
        } else {
          this.router.navigateByUrl('tabs');

        }
      }, err => {
        this.presentAlert('请检查网络！')
      }
    );
    console.log(this.loginVM);
  }

  // nav(page) {
  //   this.navCtrl.push(page);
  // }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: '请稍后',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentAlert(text) {
    const alert = await this.alertController.create({
      header: '消息',
      message: text,
      buttons: ['确认']
    });

    await alert.present();
  }
}
