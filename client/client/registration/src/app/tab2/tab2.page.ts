import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  contacts = [{
    name: '李医生',
    sex: 'girl',
    date: '2019-03-26',
    message: 'hello'
  }]
}
