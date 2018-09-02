import { Component } from '@angular/core';
import { NavController, NavParams ,Events} from 'ionic-angular';

/*
  Generated class for the Colors page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-colors',
  templateUrl: 'colors.html'
})
export class ColorsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColorsPage');
  }

  changeTheme(color){
  	
  	this.events.publish('change:theme',color);
  }
  

}
