import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDatePipe } from './myDatePipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MyDatePipe],
  providers: [
  ],
  exports: [
    MyDatePipe
  ]
})
export class PipesModule {
}
