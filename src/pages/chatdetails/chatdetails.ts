import { Component } from '@angular/core';
import { AlertController, App, NavController,NavParams} from 'ionic-angular';
import { SearchPage } from '../../pages/search/search';
import { UserData } from '../../providers/user-data';
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import "rxjs/add/operator/map";


/*
  Generated class for the Chatdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html'
})
export class ChatdetailsPage {

  id:number;
  text: string;
  details:string;
  topic:string;
  currentUser:any;
  Isdata:boolean = false;
  forumDetails: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,public navParams: NavParams,public af: AngularFire,public user: UserData) {}

  ionViewDidLoad() {

        this.id=this.navParams.get('id');
        this.details=this.navParams.get('details');
        this.topic=this.navParams.get('topic');

        this.forumDetails = this.af.database.list('/forumdetails/'+this.id, {
          query: {
            limitToLast: 100
          }
        }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;

        this.user.getCurrentUser().then((getData) =>{
          this.currentUser=getData;
        });

        this.forumDetails.subscribe(items => {

          this.Isdata = false;

          if(items.length==0){

              this.Isdata = true;
          }

        });

  }

  sendMessage(){

      if(this.text.length>0){

          this.forumDetails.push({
            text: this.text,
            name: this.currentUser.first_name,
            created:firebase.database.ServerValue.TIMESTAMP,
          }).then( getData => { 

              this.text ='';

          }, error => { 

              console.log(error); 

          });
      }
  }

  opensearchpage() {
    this.navCtrl.push(SearchPage);
  }



}
