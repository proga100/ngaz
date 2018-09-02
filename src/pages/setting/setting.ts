import { Component } from '@angular/core';
import { AlertController, App, ModalController, NavController, LoadingController } from 'ionic-angular';

import { OilsPage } from '../../pages/oils/oils';
import { LoginPage } from '../../pages/login/login';
import { ConditionsPage } from '../../pages/conditions/conditions';
import { SearchPage } from '../../pages/search/search';
import { SupportPage } from '../../pages/support/support';
import { ColorsPage } from '../../pages/colors/colors';
import { UserData } from '../../providers/user-data';
import { BuynowComponent } from '../../components/buynow/buynow';
/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  subscriber:boolean=false;
  diffDays:number=0;
  transactionList:any;
  currentUser:{regdate?:any,id?:any, email?:any,all_month?:any,all_year?:any,fitness_month?:any,food_month?:any,homecare_month?:any,motherchild_month?:any,wellness_month?:any} = {};
  
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public userData: UserData
  ) {

      this.currentUser=this.userData.getUserData();

      this.userData.getTransaction().then((getData) => {

        if(getData){
          
          this.subscriber = true;
          this.transactionList = getData;

        }else{

          
          let splitDate = this.currentUser.regdate.split('-');

          splitDate = splitDate[1]+"/"+splitDate[2]+"/"+splitDate[0];
          console.log(splitDate);

          var date1 = new Date(splitDate);
          var date2 = new Date();

          var timeDiff = Math.abs(date2.getTime() - date1.getTime());
          this.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

          this.subscriber = false;

        }

        console.log(this.transactionList);
      });

  }

  openoilspage() {
    this.navCtrl.push(OilsPage);
  }

  openconditionspage() {
    this.navCtrl.push(ConditionsPage);
  }

  opensearchpage() {
    this.navCtrl.push(SearchPage);
  }

  opensupportpage() {
    this.navCtrl.push(SupportPage);
  }

  opencolorspage() {
    this.navCtrl.push(ColorsPage);
  }

  logout() {
    this.userData.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  buynow(){

     this.app.getRootNav().setRoot(BuynowComponent);

  }



}
