import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { UserInfoComponent } from './user-info/user-info.component';
import { StudentOrderComponent } from './student-order/student-order.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{
      path: '',
      component: Tab3Page,
    }, {
      path: 'user_info',
      component: UserInfoComponent,
    }, {
      path: 'student_order',
      component: StudentOrderComponent,
    }])
  ],
  declarations: [Tab3Page, UserInfoComponent, StudentOrderComponent]
})
export class Tab3PageModule { }
