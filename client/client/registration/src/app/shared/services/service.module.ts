import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpFilter } from './http-filter';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { OfficeService } from './OfficeService';
import { WorkforceService } from './WorkforceService';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    // HttpFilter,
    OfficeService,
    WorkforceService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpFilter, multi: true},
  ]

})
export class ServiceModule {
}
