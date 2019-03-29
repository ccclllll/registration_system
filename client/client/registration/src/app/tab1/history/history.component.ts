import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../shared/services/registration.service';
import { BillService } from '../../shared/services/BillService';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('userVM'));
  history = [];
  bill: any = {};
  constructor(public registrationService: RegistrationService, public billService: BillService,
    public loadingController: LoadingController, public alertController: AlertController) { }

  ngOnInit() { }
  ionViewDidEnter() {
    this.getRegistrations();
  }

  getRegistrations() {
    this.registrationService.getRegistrations(this.user.id, this.user.role).subscribe(it => {
      const date = new Date().getTime();
      this.history = it.filter(it2 => {
        console.log(parseInt(it2.workforce.date, 10) < parseInt(this.buidDateStr(new Date()), 10))
        return parseInt(it2.workforce.date, 10) < parseInt(this.buidDateStr(new Date()), 10);
      });
    });
  }

  // this.id = id;
  // this.patient = patient;
  // this.doctor = doctor;
  // this.days = days;
  // this.reaseon = reaseon;
  // this.state = state;
  // this.date = date;

  // this.office = office;
  // this.doctor = doctor;
  // this.date = date;
  // this.patientId = patientId;
  // this.workforce = workforce;
  async applyBill(registration) {

    if (!(this.bill.startDate && this.bill.endDate && (new Date(this.bill.startDate).getTime() < new Date(this.bill.endDate).getTime()))) {
      this.presentAlert('开始日期必须小于结束日期');
      return;
    }
    const loading = await this.loadingController.create({
      message: '请稍后',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    this.billService.applyBill({
      doctor: registration.doctor.id,
      patient: registration.patientId,
      workforce: registration.workforce.id,
      state: 'inactive',
      startDate: this.bill.startDate,
      endDate: this.bill.endDate
    }).subscribe(it => {

      console.log(it);
      loading.dismiss();
      this.presentAlert(it.message);
    }, err => {
      loading.dismiss();
      this.presentAlert('网络错误');
    });
  }

  async presentAlert(text) {
    const alert = await this.alertController.create({
      header: '消息',
      message: text,
      buttons: ['确认']
    });

    await alert.present();
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
