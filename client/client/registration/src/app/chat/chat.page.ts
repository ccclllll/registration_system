import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  userId = '12344';
  otherId = '12345'
  message: String = '2322343';
  messages: any = [{
    detail: 'hello',
    type: 'text',
    from: this.otherId,
    to: this.userId,
  }, {
    detail: 'hello',
    type: 'text'
  }, {
    detail: 'hello',
    type: 'text'
  }];
  constructor() { }

  ngOnInit() {
  }
  send() {
    // this.messages.push(this.message);
    this.messages.push({
      detail: this.message,
      type: 'text',
      from: this.userId,
      to: this.messages
    });
  }

}
