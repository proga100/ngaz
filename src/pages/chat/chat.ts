import { Component } from '@angular/core';
import { AlertController, App, NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { ChatdetailsPage } from '../../pages/chatdetails/chatdetails';
import { SearchPage } from '../../pages/search/search';
import { NewtopicPage } from '../../pages/newtopic/newtopic';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import "rxjs/add/operator/map";
/*
  Generated class for the Chat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  text: string;
  currentUser:any;
  Isdata:boolean = false;
  forumList: FirebaseListObservable<any>;

  constructor( 
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,public user: UserData,public af: AngularFire) {}

    ionViewDidLoad() {

        this.forumList = this.af.database.list('/forumlist/', {
          query: {
            limitToLast: 100
          }
        }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;

        this.user.getCurrentUser().then((getData) =>{
          this.currentUser=getData;
        });

        this.forumList.subscribe(items => {

          this.Isdata = false;

          if(items.length==0){

              this.Isdata = true;
          }

        });
    }

    

    openchatdetailsspage(data) {

      console.log(data.$key);

      this.navCtrl.push(ChatdetailsPage, {
          id:data.$key,
          topic:data.topic,
          details:data.details
      });
    }

    opensearchpage() {
      this.navCtrl.push(SearchPage);
    }

    opennewtopic() {
      this.navCtrl.push(NewtopicPage);
    }

}
