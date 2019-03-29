import { Component, OnInit } from '@angular/core';
import { BillService } from '../../shared/services/BillService';

@Component({
  selector: 'app-student-order',
  templateUrl: './student-order.component.html',
  styleUrls: ['./student-order.component.scss'],
})
export class StudentOrderComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('userVM'));
  orders: any[] = [];
  constructor(public billServic: BillService) { }

  applyState = false;
  ionViewWillEnter() {
    this.billServic.userBills(this.user.id, 'student').subscribe(it => {
      console.log(it);
      this.orders = it;
    });
  }
  ngOnInit() { }

}
