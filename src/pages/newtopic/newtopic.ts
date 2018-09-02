import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams ,ToastController } from 'ionic-angular';
import {AngularFire,FirebaseListObservable} from 'angularfire2';
import { ChatPage } from '../../pages/chat/chat';
import { UserData } from '../../providers/user-data';
import * as firebase from 'firebase';
import "rxjs/add/operator/map";

@Component({
  selector: 'page-newtopic',
  templateUrl: 'newtopic.html'
})

export class NewtopicPage {
  
  text: string;
  currentUser:any;
  Isdata:boolean = false;
  forumList: FirebaseListObservable<any>;
  forumData: {topic?: string, details?: string} = {};

  constructor(public user: UserData,public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public af: AngularFire) {}

  	ionViewDidLoad() {

	    console.log('ionViewDidLoad NewtopicPage');
	    this.forumList = this.af.database.list('/forumlist/');

	    this.user.getCurrentUser().then((getData) =>{
          this.currentUser=getData;
        });

  	}

  	addForum(form: NgForm){

  		if(form.valid) {

  			 this.forumList.push({
	            topic: this.forumData.topic,
	            details:this.forumData.details,
	            name: this.currentUser.first_name,
	            userid:this.currentUser.id,
	            created:firebase.database.ServerValue.TIMESTAMP,
	        }).then( getData => { 

	            this.presentToast("Succesfully Created");
	            this.navCtrl.push(ChatPage);

	        }, error => { 

	            console.log(error); 
	            this.presentToast(error);

	        });
  		}
  	   
    }

    presentToast(msg) {

	    let toast = this.toastCtrl.create({
	      message: msg,
	      duration: 3000,
	      position: 'top'
	    });
	    toast.present();
  	}

  }

