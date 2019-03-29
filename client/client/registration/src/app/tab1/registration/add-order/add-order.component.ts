import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../shared/services/auth.service';
import { OfficeService } from '../../../shared/services/OfficeService';
import { RegistrationService } from '../../../shared/services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {

  dateTime = '上午';
  workforce: any = {};
  doctor: any = { name: '12' };
  user: any = {};
  office: any = {};
  constructor(private modalCtrl: ModalController, public navParams: NavParams,
    public auth: AuthService, public officeService: OfficeService,
    public registrationService: RegistrationService, public loadingController: LoadingController, public alertController: AlertController,
    public router: Router) {

  }

  ionViewWillEnter() {
    this.workforce = this.navParams.get('workforce');
    this.getDoctor();
    this.getUser();
    this.getOffice();
  }

  getDoctor() {
    this.auth.getUserById(this.workforce.doctor).subscribe(it => {
      this.doctor = it[0];
    });
  }

  getUser() {
    this.auth.getUserById(parseInt(JSON.parse(localStorage.getItem('userVM')).id, 10)).subscribe(it => {
      this.user = it[0];
    });
  }
  getOffice() {
    this.officeService.getOfficeById(this.workforce.office).subscribe(it => {
      this.office = it[0];
    });
  }
  ngOnInit() { }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  addOrder = async () => {
    // this.office = office;
    // this.doctor = doctor;
    // this.date = date;
    // this.patientId = patientId;
    // this.phoneNumber = phoneNumber;
    // this.workforce = workforce;
    const registration = {
      office: this.office.id,
      doctor: this.doctor.id,
      date: new Date().toJSON(),
      patientId: this.user.id,
      workforce: this.workforce.id
    };
    console.log(this.workforce);
    const loading = await this.loadingController.create({
      message: '请稍后',
      duration: 2000
    });
    await loading.present();
    this.registrationService.addRegistration(registration).subscribe(it => {
      console.log(it);
      loading.dismiss();
      // this.router.navigate(['/tabs/tab1/order']);
      if (it.code == '401') {
        this.presentAlert('不要重复预约！');
      } else {
        this.presentAlert('预约成功！')
      }
    }, err => {
      this.presentAlert('发生未知错误！请重试');
      // this.router.navigate(['/tabs/tab1/order']);
    });

    await loading.onDidDismiss();




  }

  formatDate(date) {


  }

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
