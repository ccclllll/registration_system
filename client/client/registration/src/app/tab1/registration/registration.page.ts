import { Component, OnInit } from '@angular/core';
import { OfficeService } from '../../shared/services/OfficeService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private officeService: OfficeService) { }

  ngOnInit() {
    this.officeService.getAllOfiice().subscribe(it => {
      console.log(it);
    });
  }

}
