import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform,LoadingController } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';

import { BuynowComponent } from '../components/buynow/buynow';
import { CommentsModalComponent } from '../components/comments-modal/comments-modal';


import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  chosenTheme: string;
  loggedIn:boolean = false;
  loader:any;
  currentUser:{transaction?:any,regdate?:any,id?:any, email?:any,all_month?:any,all_year?:any,fitness_month?:any,food_month?:any,homecare_month?:any,motherchild_month?:any,wellness_month?:any} = {};
  

  loggedInPages: PageInterface[] = [
    { title: 'Wellness', component: TabsPage, index: 0, icon: ''  },
    { title: 'Settings', component: TabsPage, index: 1, icon: '' },
    { title: 'Chat/Forum', component: TabsPage, index: 2, icon: '' },
    // { title: 'Buynow', component: BuynowComponent, index: 7, icon: '' },
  ];

  loggedOutPages: PageInterface[] = [];

  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public loadingCtrl:LoadingController,
    public storage: Storage
  ) {

     this.userData.getCurrentTheme().then((themeData) => {

        if(themeData){
          
          this.chosenTheme = themeData;

        }else{

          this.chosenTheme = 'theme8';
        }
    });

    
    this.userData.getCurrentUser().then((hasLoggedIn) => {

      console.log(hasLoggedIn);
      if(hasLoggedIn){

            this.loader = this.loadingCtrl.create({
              content: "Please wait...",
            });

            this.loader.present();
            
            this.confData.post('','getauthenticateuser').subscribe(getData => {

                console.log('update pushtoken');
                console.log(getData);

                this.currentUser = getData.data;
                this.userData.login(getData.data);
               // this.checkSubscribeUser();
               
            },err => {

              this.userData.logout();
              this.enableMenu(false);

              this.loader.dismiss();
              console.log(err);
        
            })
        

      }else{

        this.rootPage = LoginPage;
        this.enableMenu(false);
      }
      
      this.platformReady();

  });

  this.listenToLoginEvents();
  this.listenToEvents();

}

  

   listenToEvents() {


    this.events.subscribe('change:theme', (color) => {

        console.log('color'+color);
        this.chosenTheme = color;
        this.userData.setCurrentTheme(color);
    });

  }

  checkSubscribeUser(){

            this.userData.setTransaction(null);
            let splitDate = this.currentUser.regdate.split('-');

            splitDate = splitDate[1]+"/"+splitDate[2]+"/"+splitDate[0];
            console.log(splitDate);

            var date1 = new Date(splitDate);
            var date2 = new Date();

            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

            console.log('diffDays=='+diffDays);

            if(diffDays>8){
              
              if(this.currentUser.transaction.length==0){

                 this.loader.dismiss();
                 this.rootPage = BuynowComponent;

              }else{

                  let transaction = JSON.parse(this.currentUser.transaction[0].receipt);
                  console.log(transaction);

                  let data ={
                    'packagename':transaction.packageName,
                    'transactionid':this.currentUser.transaction[0].transactionId,
                    'productid':transaction.productId
                  }

                  this.confData.checkSubscribe(data).subscribe(getData => {

                      console.log('update pushtoken');
                      console.log(getData);

                      if(getData.ok==1){
                        
                        this.userData.setTransaction(getData);
                        this.rootPage = TabsPage;
                        this.enableMenu(true);

                      }else{

                        this.userData.setTransaction(getData);
                        this.rootPage = BuynowComponent;

                      }
                      
                      this.loader.dismiss();

                  },err => {

                    this.loader.dismiss();
                    console.log(err);
              
                  })
              }
              
            }else if(this.currentUser.transaction.length>0){

                  this.loader.dismiss();
                  this.rootPage = TabsPage;
                  this.enableMenu(true);

                  let transaction = JSON.parse(this.currentUser.transaction[0].receipt);

                  let data ={
                    'packagename':transaction.packageName,
                    'transactionid':this.currentUser.transaction[0].transactionId,
                    'productid':transaction.productId
                  }

                  this.confData.checkSubscribe(data).subscribe(getData => {

                      console.log('update pushtoken');
                      console.log(getData);

                      if(getData.ok==1){
                        
                        this.userData.setTransaction(getData);
                      }

                  },err => {

                    console.log(err);
              
                  })

              
            }else{

               this.loader.dismiss();
               this.rootPage = TabsPage;
               this.enableMenu(true);
            }

            
           
        
  }


  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  openTutorial() {
    this.nav.setRoot(LoginPage);
  }

  listenToLoginEvents() {

    this.events.subscribe('user:login', () => {
      
      this.currentUser=this.userData.getUserData();
      

      if(this.loader){

       
      }else{

         this.loader = this.loadingCtrl.create({
          content: "Please wait...",
        });
        this.loader.present();
      }
      
      this.checkSubscribeUser();
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });


  }
  enableMenu(loggedIn) {

   
    this.loggedIn = loggedIn;

     console.log('this.loggedIn===='+this.loggedIn);  // this.menu.enable(loggedIn, 'loggedInMenu');
    // this.menu.enable(!loggedIn, 'loggedOutMenu');
  
  }
  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      setTimeout(() => {
       
        Splashscreen.hide();

      }, 100);

    });
  }
}
