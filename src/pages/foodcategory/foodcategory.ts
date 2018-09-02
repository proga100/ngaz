import { Component } from '@angular/core';
import { NavController, LoadingController,NavParams,AlertController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { ConditionsPage } from '../../pages/conditions/conditions';
/*
  Generated class for the Foodcategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-foodcategory',
  templateUrl: 'foodcategory.html'
})
export class FoodcategoryPage {
  
   getFoodList=[];
   getFoodStyleList =[];
   getList = [];
   Isdata:boolean = false;
   selectStyleFood:any;
   colorCode = ['#f1b136','#6ab5b1','#69344d','#7c57e4','#eb3c75','#f1b136','#6ab5b1','#69344d','#7c57e4','#eb3c75','#eb3c75','#f1b136','#6ab5b1','#69344d']
   perPage = 100;
   id;

  constructor(
  	  public navCtrl: NavController, 
  	  public navParams: NavParams,
      public loadingCtrl: LoadingController, 
      public confData: ConferenceData,
      public alertCtrl: AlertController
    ) {}

  	ionViewDidLoad() {
	    console.log('ionViewDidLoad FoodcategoryPage');
	    this.id=this.navParams.get('id');
	    this.getReceipesPage();
  	}

  	showStyleFood(data) {
	    
      console.log(data);
	    let alert = this.alertCtrl.create();
      
	    alert.setTitle('Style Food');

      for(let styledata in this.getFoodStyleList){

          let count = 0;

          for(let listdata in this.getList){

              if(this.getList[listdata]['food_style']==this.getFoodStyleList[styledata].id){

                count = count+1;
              }

          }

          this.getFoodStyleList[styledata].count = count;

      }

	    for(let fooddata in this.getFoodStyleList){

	    	alert.addInput({
		      type: 'checkbox',
		      label: this.getFoodStyleList[fooddata]['food_style']+'('+this.getFoodStyleList[fooddata]['count']+')',
		      value: this.getFoodStyleList[fooddata]['id'],
		      checked: false
		    });

	    }

	    alert.addButton('Cancel');
	    alert.addButton({
	      text: 'OK',
	      handler: selectdata => {
	        //this.testRadioOpen = false;
	        this.selectStyleFood = selectdata;
	        this.navCtrl.push(ConditionsPage, {
      			id:this.id,
      			cuisinefood:data.id,
            foodname:data.cuisine_food,
      			stylefood:this.selectStyleFood,
   			 });
	       
	      }
	    });

	    alert.present();
  	}

    getReceipesPage(){

      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });

      loader.present();

      this.confData.get('getfoodcategory').subscribe(getData => {
          
          console.log(getData);

          if(getData.status){

            this.getFoodList = getData.data.cuisinefood;
            this.getFoodStyleList = getData.data.foodstyle;

            console.log(this.getFoodList);
            for (var key in this.getFoodList) {
              
              this.getFoodList[key].color = this.colorCode[Math.round(Math.random()*12)];
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

          if(getData.status){

            this.getList = getData.data.data;

            for(let data in this.getFoodList){

                let count = 0;

                for(let listdata in this.getList){

                    if(this.getList[listdata]['cuisine_food']==this.getFoodList[data].id){

                        count = count+1;
                    }

                }

                this.getFoodList[data].count = count;

                
            }

            //console.log(this.getFoodList);

          }

          loader.dismiss();
      })

    }


}
