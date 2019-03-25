import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public router: Router) {

  }
  nav(url: String) {
    console.log('nav')
    this.router.navigate(['tabs/tab1/' + url]);
  }
}
