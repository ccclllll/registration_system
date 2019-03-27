import { Component, OnInit } from '@angular/core';
import { OfficeService } from '../../shared/services/OfficeService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  offices = [];
  template = 'officeTemplate';
  selectedOffice;
  officeDoctors = [];
  constructor(private officeService: OfficeService) { }

  ngOnInit() {
    this.officeService.getAllOfiice().subscribe(it => {
      this.offices = it;
    });
  }

  findDoctor(office) {
    this.selectedOffice = office;
    this.template = 'workforceTemplate';
    this.officeService.getOfficeDoctor(office.id).subscribe(it => {
      this.officeDoctors = it;
    });
  }

}
