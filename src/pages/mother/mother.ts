import { Component } from '@angular/core';
import { AlertController, App, ModalController, NavController, LoadingController } from 'ionic-angular';
import { OilsPage } from '../../pages/oils/oils';
import { ConditionsPage } from '../../pages/conditions/conditions';
import { SearchPage } from '../../pages/search/search';

import { UserData } from '../../providers/user-data';
import { BuynowComponent } from '../../components/buynow/buynow';

@Component({
  selector: 'page-mother',
  templateUrl: 'mother.html'
})
export class MotherPage {

  currentUser:{regdate?:any,id?:any, email?:any,all_month?:any,all_year?:any,fitness_month?:any,food_month?:any,homecare_month?:any,motherchild_month?:any,wellness_month?:any} = {};
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public userData: UserData,

  ) {}

  ionViewDidLoad() {

    this.currentUser=this.userData.getUserData();
    console.log('ionViewDidLoad WellnessPage');

  }
  actionPage(type){

      let splitDate = this.currentUser.regdate.split('-');

      splitDate = splitDate[1]+"/"+splitDate[2]+"/"+splitDate[0];
      console.log(splitDate);

      var date1 = new Date(splitDate);
      var date2 = new Date();

      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

      if(diffDays>8){

        console.log('trail version expire');
        
        if(this.currentUser.all_month==0&&this.currentUser.all_year==0&&this.currentUser.motherchild_month==0){

          this.app.getRootNav().setRoot(BuynowComponent);

        }else{

          this.gotoPage(type);
        }
        
      }else{

        this.gotoPage(type);
      }
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
      id:5
    });

  }
  openconditionspage() {
   

     this.navCtrl.push(ConditionsPage, {
      id:5
    });

  }

  opensearchpage() {
    this.navCtrl.push(SearchPage);

  }

}
