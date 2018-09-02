import { Component } from '@angular/core';

import { NavParams ,Events } from 'ionic-angular';
import { WellnessPage } from '../../pages/wellness/wellness';
import { FoodPage } from '../../pages/food/food';
import { FitnessPage } from '../../pages/fitness/fitness';
import { HomecarePage } from '../../pages/homecare/homecare';
import { MotherPage } from '../../pages/mother/mother';
import { SettingPage } from '../../pages/setting/setting';
import { ChatPage } from '../../pages/chat/chat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  themeColor: string = '';
  // set the root pages for each tab
  tab1Root: any = WellnessPage;
  tab2Root: any = FoodPage;
  tab3Root: any = FitnessPage;
  tab4Root: any = HomecarePage;
  tab5Root: any = MotherPage;
  tab6Root: any = SettingPage;
  tab7Root: any = ChatPage;


  mySelectedIndex: number;

  constructor(navParams: NavParams,public events: Events) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    this.themeColor = 'color0';
    

  }

 

}
