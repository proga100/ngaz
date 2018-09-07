import { Component } from '@angular/core';
import {ViewController,ModalController,NavController,NavParams,LoadingController} from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import { UserData } from '../../providers/user-data';
import { TabsPage } from '../../pages/tabs/tabs';
import * as firebase from 'firebase';
import "rxjs/add/operator/map";
/*
  Generated class for the CommentsModal component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

@Component({
  selector: 'comments-modal',
  templateUrl: 'comments-modal.html'
})

export class CommentsModalComponent {

  text: string;
  id:number;
  currentUser:any;
  Isdata:boolean = false;
  contribution: FirebaseListObservable<any>;

  constructor( public navCtrl: NavController,public viewCtrl: ViewController,public user: UserData, public loadingCtrl: LoadingController,
    public navParams: NavParams,public modalCtrl: ModalController,public af: AngularFire) {

    this.id=this.navParams.get('id');
    console.log('this.id===='+this.id);
    
  }

  ionViewDidLoad() {


    this.contribution = this.af.database.list('/contribution/'+this.id, {
      query: {
        limitToLast: 100
      }
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;

    this.user.getCurrentUser().then((getData) =>{
      this.currentUser=getData;
    });

    this.contribution.subscribe(items => {

      this.Isdata = false;

      if(items.length==0){

          this.Isdata = true;
      }

    });
  }

  sendMessage(){


    if(this.text.length>0){

        this.contribution.push({
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


}
