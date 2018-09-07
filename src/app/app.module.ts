import { NgModule,enableProdMode } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';
import { WellnessPage } from '../pages/wellness/wellness';
import { FoodPage } from '../pages/food/food';
import { FoodcategoryPage } from '../pages/foodcategory/foodcategory';
import { FitnessPage } from '../pages/fitness/fitness';
import { HomecarePage } from '../pages/homecare/homecare';
import { LocationPage } from '../pages/location/location';
import { MotherPage } from '../pages/mother/mother';
import { SettingPage } from '../pages/setting/setting';
import { ChatPage } from '../pages/chat/chat';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { SupportPage } from '../pages/support/support';
import { ColorsPage } from '../pages/colors/colors';
import { NewtopicPage } from '../pages/newtopic/newtopic';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { OilsPage } from '../pages/oils/oils';
import { ConditionsPage } from '../pages/conditions/conditions';
import { SearchPage } from '../pages/search/search';
import { OilsdetailPage } from '../pages/oilsdetail/oilsdetail';
import { ConditionsdetailPage } from '../pages/conditionsdetail/conditionsdetail';


import { CommentsModalComponent } from '../components/comments-modal/comments-modal';

import { BuynowComponent } from '../components/buynow/buynow';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

import {AngularFireModule } from 'angularfire2';
import {firebaseConfig } from '../providers/config';
import {MomentModule} from 'angular2-moment';

import { CapitalizePipe } from '../pipes/capitalize';
import { OrderByPipe } from '../pipes/orderby';
import { SafePipe } from '../pipes/safe';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

enableProdMode();
@NgModule({
  declarations: [
    CapitalizePipe,
    OrderByPipe,
    SafePipe,
    LocationPage,
    FoodcategoryPage,
    ConferenceApp,
    WellnessPage,
    FoodPage,
    FitnessPage,
    HomecarePage,
    MotherPage,
    SettingPage,
    ChatPage,
    ChatdetailsPage,
    SupportPage,
    ColorsPage,
    NewtopicPage,
    LoginPage,
    SignupPage,
    TabsPage,
    OilsPage,
    ConditionsPage,
    SearchPage,
    OilsdetailPage,
    ConditionsdetailPage,
    CommentsModalComponent,
    BuynowComponent,
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp,{tabsPlacement: 'top'}),
   AngularFireModule.initializeApp(firebaseConfig),
     IonicStorageModule.forRoot(),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    WellnessPage,
    FoodcategoryPage,
    FoodPage,
    LocationPage,
    FitnessPage,
    HomecarePage,
    MotherPage,
    SettingPage,
    ChatPage,
    ChatdetailsPage,
    SupportPage,
    ColorsPage,
    NewtopicPage,
    LoginPage,
    SignupPage,
    TabsPage,
    OilsPage,
    ConditionsPage,
    SearchPage,
    OilsdetailPage,
    ConditionsdetailPage,
    CommentsModalComponent,
    BuynowComponent,
  ],
  providers: [ConferenceData, UserData,Push]
})
export class AppModule { }
