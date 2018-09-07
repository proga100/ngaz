import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController , LoadingController ,ToastController} from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { ConferenceData } from '../../providers/conference-data';



@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})

export class LoginPage {

  login: {email?: string, password?: string} = {};
  submitted = false;

  constructor(
     public navCtrl: NavController,
     public userData: UserData,
     public confData: ConferenceData,
     public loadingCtrl: LoadingController,
     public toastCtrl: ToastController
  ){}

  onLogin(form: NgForm) {
    
      this.submitted = true;
    
      if(form.valid) {

        let loader = this.loadingCtrl.create({
          content: "Please wait...",
        });

        loader.present();

        this.confData.post(this.login,'login').subscribe(getData => {
          
          console.log(getData);
          loader.dismiss();

          if(getData.status){

            if(getData.data.active==1){

              this.userData.login(getData.data);
              this.navCtrl.push(TabsPage);

            }else{

              this.presentToast('your account was blocked. please contact administrator.');
            }
            
           // 

          }else{

            this.presentToast(getData.message);

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

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  onSkip() {
    this.navCtrl.push(TabsPage);
  }
  

  

}
