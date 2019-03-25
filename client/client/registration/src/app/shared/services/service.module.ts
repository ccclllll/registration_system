import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpFilter } from './http-filter';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpFilter, multi: true},
    HttpFilter
  ]

})
export class ServiceModule {
}
