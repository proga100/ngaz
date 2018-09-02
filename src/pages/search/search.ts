import { Component } from '@angular/core';
import { AlertController, App, ModalController, NavController, LoadingController } from 'ionic-angular';
import { OilsdetailPage } from '../../pages/oilsdetail/oilsdetail';
import { ConferenceData } from '../../providers/conference-data';
import { ConditionsdetailPage } from '../../pages/conditionsdetail/conditionsdetail';
/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

    getList:any;
    oilList=[];
    conditionList=[];
    Isdata:boolean = false;
    queryText:string = '';
    colorCode = ['#f1b136','#6ab5b1','#69344d','#7c57e4','#eb3c75','#f1b136','#6ab5b1','#69344d','#7c57e4','#eb3c75','#eb3c75','#f1b136','#6ab5b1','#69344d']
    perPage = 1000;
    id;

  constructor(    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public confData: ConferenceData,
   ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  openoilspage() {
    this.navCtrl.push(OilsdetailPage);
  }

  htmlToPlaintext(text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }

  searchByKeyword(event){

      if(this.queryText.length>0){

          let loader = this.loadingCtrl.create({
            content: "Please wait...",
          });

          loader.present();
          this.Isdata = false

          this.confData.get('searchall/'+this.queryText).subscribe(getData => {

              console.log(getData);
              if(getData.status){

                this.getList = getData.data;
                this.conditionList = this.getList.condition;
                this.oilList = this.getList.oil;
                
                for (var key in this.conditionList) {

                  this.conditionList[key].color = this.colorCode[Math.round(Math.random()*12)];
                  this.conditionList[key].condition_name = this.htmlToPlaintext(this.conditionList[key].condition_name);
                }

                for (var key in this.oilList) {
                  
                  this.oilList[key].color = this.colorCode[Math.round(Math.random()*12)];
                  this.oilList[key].companion_oils = this.htmlToPlaintext(this.oilList[key].companion_oils);
                }

                if(this.conditionList.length==0&&this.oilList.length==0){

                    this.Isdata = true
                }

              }

              loader.dismiss();

          });

      }
  }

  openconditionsdetailpage(data) {

        console.log(data);
        
        this.navCtrl.push(ConditionsdetailPage, {
          id:data.id,categoryid:1
        });

    }

    openoilsdetailpage(data) {

        console.log(data);
        
        this.navCtrl.push(OilsdetailPage, {
          id:data.id
        });

    }


}
