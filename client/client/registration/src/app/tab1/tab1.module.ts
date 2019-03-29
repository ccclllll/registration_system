import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { HistoryComponent } from './history/history.component';
import { OrderComponent } from './order/order.component';
import { OrderApplyComponent } from './order-apply/order-apply.component';
import { PipesModule } from '../shared/pipes/pipe.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipesModule,
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
    }, {
      path: 'order_apply',
      component: OrderApplyComponent
    }])
  ],
  declarations: [Tab1Page, HistoryComponent, OrderComponent, OrderApplyComponent]
})
export class Tab1PageModule { }
