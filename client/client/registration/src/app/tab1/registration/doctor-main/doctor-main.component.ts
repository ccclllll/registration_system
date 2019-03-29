import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkforceService } from '../../../shared/services/WorkforceService';
import { AddOrderComponent } from '../add-order/add-order.component';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../../shared/services/auth.service';
import { OfficeService } from 'src/app/shared/services/OfficeService';

@Component({
  selector: 'app-doctor-main',
  templateUrl: './doctor-main.component.html',
  styleUrls: ['./doctor-main.component.scss'],
})
export class DoctorMainComponent implements OnInit {

  doctorId;

  doctor = [{}];
  workforces = [];
  user = {};
  doctorStr = '';
  office: any = {};
  constructor(private routerinfo: ActivatedRoute, public workforceService: WorkforceService, public modalCtr: ModalController,
    public auth: AuthService, public officeService: OfficeService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.doctorId = this.routerinfo.params.subscribe(par => {
      this.doctorId = par['doctorId'];
      this.workforceService.getDoctorAllWorkforce(this.doctorId).subscribe(it => {
        this.workforces = it.filter(item => {
          return parseInt(item.date, 10) > parseInt(this.buidDateStr(new Date()), 10);
        });
      });
      this.auth.getUserById(this.doctorId).subscribe(it => {
        this.doctor = it;
        this.officeService.getOfficeById(it[0].office).subscribe(it3 => {
          this.office = it3[0];
        });
        this.doctorStr = JSON.stringify(this.doctor);
      });
    });

  }

  async createAddOrderModal(workforce) {
    const modal = await this.modalCtr.create({
      component: AddOrderComponent,
      componentProps: {
        workforce: workforce
      }
    });
    return await modal.present();
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
