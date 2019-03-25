import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page },
     { path: 'registration', loadChildren: './tab1/registration/registration.module#RegistrationPageModule' }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule { }
