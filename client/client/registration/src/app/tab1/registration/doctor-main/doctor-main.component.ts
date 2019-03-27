import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkforceService } from '../../../shared/services/WorkforceService';
import { AddOrderComponent } from '../add-order/add-order.component';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-doctor-main',
  templateUrl: './doctor-main.component.html',
  styleUrls: ['./doctor-main.component.scss'],
})
export class DoctorMainComponent implements OnInit {

  doctorId;

  doctor = {};
  workforces = [];
  user = {};
  constructor(private routerinfo: ActivatedRoute, public workforceService: WorkforceService, public modalCtr: ModalController,
    public auth: AuthService) { }

  ngOnInit() {
    this.doctorId = this.routerinfo.params.subscribe(par => {
      this.doctorId = par['doctorId'];
      this.workforceService.getDoctorAllWorkforce(this.doctorId).subscribe(it => {
        this.workforces = it;
      });
      this.doctor = this.auth.getUserById(this.doctorId).subscribe(it => {
        console.log(it);
        this.doctor = it;
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
}
