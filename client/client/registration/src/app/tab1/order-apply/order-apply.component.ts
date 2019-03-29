import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/shared/services/BillService';

@Component({
  selector: 'app-order-apply',
  templateUrl: './order-apply.component.html',
  styleUrls: ['./order-apply.component.scss'],
})
export class OrderApplyComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('userVM'));
  orders: any[] = [];
  applyState = false;
  orderState = 'disagree';

  constructor(public billService: BillService) { }

  ionViewWillEnter() {
    this.loadData();
  }
  ngOnInit() { }

  loadData() {
    this.billService.userBills(this.user.id, this.user.role).subscribe(it => {
      this.orders = it;
    });
  }

  agree() {
    this.orderState = 'active';
    this.applyState = true;
  }

  disagree() {
    this.orderState = 'inactive';
    this.applyState = true;
  }

  updateBill(bill) {
    bill.state = this.orderState;
    bill.doctor = bill.doctor.id ? bill.doctor.id : bill.doctor;
    bill.patient = bill.patient.id ? bill.patient.id : bill.patient;
    // debugger
    this.billService.updateBill(bill).subscribe(it => {
      console.log(it);
      this.loadData();
      this.applyState = false;
    });
  }

}
