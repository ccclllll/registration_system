import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../shared/services/message.service';
import { AuthService } from '../shared/services/auth.service';
import { IonContent } from '@ionic/angular';
import { ConcatSource } from 'webpack-sources';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  userId = '12344';
  otherId;
  studentId = '150154057';
  message: String = '';
  messages: any = [];
  socket;

  other: any = {};
  userVM = JSON.parse(localStorage.getItem('userVM'));
  @ViewChild(IonContent) content: IonContent;
  constructor(private routerinfo: ActivatedRoute, public messageService: MessageService, public auth: AuthService,
    private el: ElementRef,
    private renderer2: Renderer2) { }

  ngOnInit() {
    this.createSockt();
  }


  ionViewWillEnter() {
    this.routerinfo.params.subscribe(par => {
      this.otherId = par['otherId'];
      console.log(this.otherId);
      this.auth.getUserById(this.otherId).subscribe(it => {
        console.log(it);
        this.other = it[0];
        this.getCurrentMessages();

      });
    });
  }

  send() {
    const otherId = this.otherId;
    const to = this.userVM.role === 'student' ? this.otherId : this.studentId;
    const from = this.userVM.id;
    const date = new Date().getTime();
    const message = {
      date: date,
      to: to,
      detail: this.message,
      from: from,
      type: 'text',
      state: 'unread'
    };

    this.messages.push(message);
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
    // 先存message
    this.messageService.addMessage(message).subscribe(it => {
      this.message = '';
      if (this.socket) {
        this.socket.send(JSON.stringify(message));
      }
    });

  }

  getCurrentMessages() {
    this.messageService.getCurrentMessages(this.userVM.id, this.other.id).subscribe(it => {
      this.messages = it;
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 1000);
    });
  }


  createSockt() {
    if (!this.socket) {
      this.socket = new WebSocket('ws://47.100.166.151:8003');
    }

    // 告知后台次消息是首次连接时的消息
    this.socket.onopen = () => {
      // Web Socket 已连接上，使用 send() 方法发送数据
      this.socket.send(JSON.stringify({ userId: this.userVM.id, type: 'connection' }));
    };


    this.socket.onmessage = (e) => {
      console.log(e.data);
      this.messages.push(JSON.parse(e.data));
    };

    this.socket.onclose = () => {
      this.socket = undefined;
    };
  }




}
