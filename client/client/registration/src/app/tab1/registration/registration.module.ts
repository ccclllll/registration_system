import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistrationPage } from './registration.page';
import { DoctorMainComponent } from './doctor-main/doctor-main.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { PipesModule } from 'src/app/shared/pipes/pipe.module';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  },
  {
    path: 'doctor/:doctorId',
    component: DoctorMainComponent
  }, {
    path: 'add_order',
    component: AddOrderComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegistrationPage,
    DoctorMainComponent,
    AddOrderComponent
  ],
  exports: [
    DoctorMainComponent
  ]
})
export class RegistrationPageModule { }
