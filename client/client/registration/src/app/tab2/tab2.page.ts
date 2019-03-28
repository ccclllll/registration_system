import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  contacts: any[] = [];
  user = JSON.parse(localStorage.getItem('userVM'));
  constructor(public messageService: MessageService) {

  }
  ngOnInit() {
    this.messageService.getContacts(this.user.id).subscribe(it => {
      console.log(it);
      this.contacts = it;
    })
  }


}
