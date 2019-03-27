import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  userId = '12344';
  otherId = '111115';
  studentId = '150154057';
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
  socket;
  userVM = JSON.parse(localStorage.getItem('userVM'));
  constructor() { }

  ngOnInit() {
    this.createSockt()
  }
  send() {
    // this.messages.push(this.message);
    // this.messages.push({
    //   detail: this.message,
    //   type: 'text',
    //   from: this.userId,
    //   to: this.messages
    // });
    console.log('send')
    const otherId = this.otherId;
    const to = this.userVM.role === 'student' ? this.otherId : this.studentId;
    const from = this.userVM.id;
    console.log(from===this.userId)
    const message = { to: to, detail: this.message, from: from, type: 'text' };
    this.messages.push(message);
    this.socket.send(JSON.stringify(message));
  }


  createSockt() {
    if (!this.socket) {
      this.socket = new WebSocket('ws://localhost:8003');
    }

    // document.getElementById('userId').onchange = function (e) {
    //   id = e.target.value;
    // }

    this.socket.onopen = () => {
      // Web Socket 已连接上，使用 send() 方法发送数据
      this.socket.send(JSON.stringify({ userId: this.userVM.id }));
    };
    // console.log(document.getElementByTagName('button'))
    // document.getElementsByTagName('button')[0].onclick = function () {
    //   this.ws.send(JSON.stringify({ to: 234, details: id }))
    // }

    this.socket.onmessage = (e) => {
      // document.getElementById('message').innerText = e.data
      console.log(e.data);
      const from = this.userVM.role === 'student' ? this.otherId : this.studentId;
      const to = this.userVM.id;
      this.messages.push({
        detail: e.data,
        type: 'text',
        from: from,
        to: to
      });
    };

    this.socket.onclose = () => {
      this.socket = undefined;
    };
  }



}
