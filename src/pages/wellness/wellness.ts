import { Component } from '@angular/core';
import { AlertController, App, ModalController, NavController, LoadingController } from 'ionic-angular';
import { OilsPage } from '../../pages/oils/oils';
import { ConditionsPage } from '../../pages/conditions/conditions';
import { SearchPage } from '../../pages/search/search';
import { LoginPage } from '../../pages/login/login';
import { UserData } from '../../providers/user-data';
import { BuynowComponent } from '../../components/buynow/buynow';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-wellness',
  templateUrl: 'wellness.html'
})

export class WellnessPage {

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks = [];
  shownSessions: any = [];
  groups = [];
  confDate: string;
  currentUser:{transaction?:any,regdate?:any,id?:any, email?:any,all_month?:any,all_year?:any,fitness_month?:any,food_month?:any,homecare_month?:any,motherchild_month?:any,wellness_month?:any} = {};

  constructor(    
    public alertCtrl: AlertController,
    public app: App,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public userData: UserData,
  ) {

  }

  ionViewDidLoad() {

    this.currentUser=this.userData.getUserData();
    console.log('ionViewDidLoad WellnessPage');

  }

  actionPage(type){


      this.gotoPage(type);
  }

  


  gotoPage(type){


      if(type=='oils'){

        this.openoilspage();

      }else if(type=='conditions'){

        this.openconditionspage();

      }else{

        this.opensearchpage();
      }
  }

  openoilspage() {

    this.navCtrl.push(OilsPage, {
      id:1
    });

  }

  openconditionspage() {
   
    this.navCtrl.push(ConditionsPage, {
      id:1
    });

  }

  opensearchpage() {

    this.navCtrl.push(SearchPage);

  }

  openloginpage() {
  
    this.navCtrl.push(LoginPage);

  }

}
