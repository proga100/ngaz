import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { ConditionsPage } from '../../pages/conditions/conditions';
/*
  Generated class for the Location page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  
   getLocationList=[];
   Isdata:boolean = false;
   selectStyleFood:any;
   getList:any;
   homecareLocation:any;
   colorCode = ['#f1b136','#6ab5b1','#69344d','#7c57e4','#eb3c75','#f1b136','#6ab5b1','#69344d','#7c57e4','#eb3c75','#eb3c75','#f1b136','#6ab5b1','#69344d'];
   perPage = 100;
   id;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public confData: ConferenceData) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    this.id=this.navParams.get('id');
    this.getLocation();
  }

  showHomeCare(data){

        console.log(data);
  	 		this.navCtrl.push(ConditionsPage, {
      			id:this.id,
      			locationid:data.id,
            locationname:data.name
   			 });
  }

  getLocation(){

  	//

  	 let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });

      loader.present();

      this.confData.get('gethomecarelocation').subscribe(getData => {
          
          console.log(getData);

          if(getData.status){

            this.getLocationList = getData.data.location;
           

            console.log(this.getLocationList);
            for (var key in this.getLocationList) {
              
              this.getLocationList[key].color = this.colorCode[Math.round(Math.random()*12)];
            }

          }

          loader.dismiss();

          this.getConditionPage();
          console.log(this.Isdata);

      });

  }

  getConditionPage(){

      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });

      loader.present();

      this.confData.get('getreceiptbycondition/'+this.id+'/'+this.perPage).subscribe(getData => {

          console.log('inininiin======');
          if(getData.status){

            this.getList = getData.data.data;

            console.log(this.getList);

            for(let data in this.getLocationList){

                let count = 0;

                for(let listdata in this.getList){

                    console.log('loca'+this.getList[listdata]['location']);
                    if(this.getList[listdata]['home_care_location']==this.getLocationList[data].id){

                        count = count+1;
                    }

                }

                this.getLocationList[data].count = count;

                
            }

            console.log(this.getLocationList);

          }

          loader.dismiss();
      })

    }

}
