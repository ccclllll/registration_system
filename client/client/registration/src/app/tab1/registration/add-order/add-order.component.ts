import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from '../../../shared/services/auth.service';
import { OfficeService } from '../../../shared/services/OfficeService';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {

  dateTime = '上午';
  workforce: any = {};
  doctor = { name: '12' };
  user = {};
  office = {};
  constructor(private modalCtrl: ModalController, navParams: NavParams, public auth: AuthService, public officeService: OfficeService) {
    this.workforce = navParams.get('workforce');
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

}
