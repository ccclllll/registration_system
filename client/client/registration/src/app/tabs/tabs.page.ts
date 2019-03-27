import { Component, ViewChild, ViewChildren } from '@angular/core';
import { IonTabs, IonIcon } from '@ionic/angular';
const tabIcon = {
  tab1: {
    icon: '../../assets/img/home.svg',
    selectedIcon: '../../assets/img/home_selected.svg'
  },
  tab2: {
    icon: '../../assets/img/chat4.svg',
    selectedIcon: '../../assets/img/chat_selected.svg'
  },
  tab3: {
    icon: '../../assets/img/star.svg',
    selectedIcon: '../../assets/img/star_selected.svg'
  }
};
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild(IonTabs) tbas: IonTabs;
  @ViewChild('icon1') icon1: IonIcon;
  @ViewChild('icon2') icon2: IonIcon;
  @ViewChild('icon3') icon3: IonIcon;
  tabChange(e) {
    // console.log(e)
    const tabStr = this.tbas.getSelected()

    switch (tabStr) {
      case 'tab1': {
        this.icon1.src = tabIcon[tabStr].selectedIcon;
        this.icon2.src = tabIcon['tab2'].icon;
        this.icon3.src = tabIcon['tab3'].icon;
      } break;
      case 'tab2': {
        this.icon2.src = tabIcon[tabStr].selectedIcon;
        this.icon1.src = tabIcon['tab1'].icon;
        this.icon3.src = tabIcon['tab3'].icon;
      } break;

      case 'tab3': {
        this.icon3.src = tabIcon[tabStr].selectedIcon;
        this.icon2.src = tabIcon['tab2'].icon;
        this.icon1.src = tabIcon['tab1'].icon;
      } break;
      default: break;

    }
  }
  }
