import { Component } from '@angular/core';
import { AlertController, App, ModalController, NavController, LoadingController,NavParams } from 'ionic-angular';
import { ConditionsdetailPage } from '../../pages/conditionsdetail/conditionsdetail';
import { SearchPage } from '../../pages/search/search';
import { ConferenceData } from '../../providers/conference-data';



/*
  Generated class for the Conditions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-conditions',
  templateUrl: 'conditions.html',
})


export class ConditionsPage {

    getList=[];
    Isdata:boolean = false;
    colorCode = ['#f1b136','#6ab5b1','#69344d','#7c57e4','#eb3c75','#f1b136','#6ab5b1','#69344d','#7c57e4','#eb3c75','#eb3c75','#f1b136','#6ab5b1','#69344d']
    perPage = 100;
    id;
    foodname:any;
    locationname:any;
    cuisinefood:any;
    stylefood:any;
    locationData:any;
    locationid:any;
    foodData=[];
    title:string;

    constructor(    
      public alertCtrl: AlertController,
      public app: App,
      public navParams: NavParams,
      public loadingCtrl: LoadingController,
      public modalCtrl: ModalController,
      public navCtrl: NavController, 
      public confData: ConferenceData,
    ) {}

    ionViewDidLoad() {

      console.log('ionViewDidLoad ConditionsPage');
      console.log(this.navParams);

      this.id=this.navParams.get('id');
      this.cuisinefood=this.navParams.get('cuisinefood');
      this.stylefood=this.navParams.get('stylefood');
      this.locationid=this.navParams.get('locationid');
      this.foodname = this.navParams.get('foodname');
      this.locationname = this.navParams.get('locationname');

      if(this.id==1){

        this.title = 'CONDITIONS';

      }else if(this.id==2){

        this.title = this.foodname +' RECIPES';

      }else if(this.id==3){

        this.title = 'CONDITIONS';

      }else if(this.id==4){

        this.title = this.locationname + ' LOCATION';

      }else if(this.id==5){

        this.title = 'CONDITIONS';
      }

      this.getConditionPage();

      console.log(this.id);
    }

    

    getConditionPage(){

      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });

      loader.present();

      this.confData.get('getreceiptbycondition/'+this.id+'/'+this.perPage).subscribe(getData => {

          if(getData.status){

            this.getList = getData.data.data;

           // console.log(this.getList);

            for (var key in this.getList) {
              
              this.getList[key].color = this.colorCode[Math.round(Math.random()*12)];
              this.getList[key].condition_name = this.htmlToPlaintext(this.getList[key].condition_name);
            }

            this.foodData = [];
           
            if(this.id==2){

                for(let key in this.getList){

                   if(this.getList[key]['cuisine_food']==this.cuisinefood){

                      if(this.stylefood.length==0){

                          this.foodData.push(this.getList[key]);

                      }else{

                        for(let style in this.stylefood){

                          if(this.stylefood[style]==this.getList[key]['food_style']){

                            this.foodData.push(this.getList[key]);
                          }
                        }
                      }
                      
                     
                   }
                }

                this.getList = this.foodData;
            }

            if(this.id==4){

                 this.locationData =[];

                  for(let key in this.getList){

                    if(this.getList[key]['home_care_location']==this.locationid){

                      this.locationData.push(this.getList[key]);
                    }

                  }

                 this.getList = this.locationData;
                
                 console.log('this.locationid'+this.locationid);
            }
            
            //console.log(this.getList);

            if(this.getList.length==0){
              this.Isdata = true
            }


          }

          loader.dismiss();

          //console.log(this.Isdata);

      });

    }

    htmlToPlaintext(text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }

    openconditionsdetailpage(data) {

        console.log(data);
        
        this.navCtrl.push(ConditionsdetailPage, {
            id:data.id,
            categoryid:this.id,
        });
        

    }

    opensearchpage() {
      
      this.navCtrl.push(SearchPage);

    }

}
