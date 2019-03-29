import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { HistoryComponent } from './history/history.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{
      path: '',
      component: Tab1Page
    }, {
      path: 'registration',
      loadChildren: './registration/registration.module#RegistrationPageModule'
    }, {
      path: 'history',
      component: HistoryComponent
    }, {
      path: 'order',
      component: OrderComponent
    }])
  ],
  declarations: [Tab1Page, HistoryComponent, OrderComponent]
})
export class Tab1PageModule { }
