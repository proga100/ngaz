import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, LoadingController ,ToastController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';
import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {email?: string, password?: string,name?: string} = {};
  submitted = false;
  error_msg = '';

  constructor( public navCtrl: NavController,
   public userData: UserData,
   public confData: ConferenceData,
   public loadingCtrl: LoadingController,
   public toastCtrl: ToastController) {}

  onSignup(form: NgForm) {
    
    this.submitted = true;

    if (form.valid) {
        
        let loader = this.loadingCtrl.create({
          content: "Please wait...",
        });

        loader.present();

       
        this.error_msg='';

        this.confData.post(this.signup,'register').subscribe(getData => {
          
          loader.dismiss();

          if(getData.status){

            this.presentToast(getData.message);
            this.navCtrl.push(LoginPage);

          }else{

            for (var key in getData.message) {
             
              this.error_msg = this.error_msg+getData.message[key];
            }

            this.presentToast(this.error_msg);
          }

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
