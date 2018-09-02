import { Component } from '@angular/core';
import { AlertController, NavParams,App, ModalController, NavController, LoadingController } from 'ionic-angular';
import { OilsdetailPage } from '../../pages/oilsdetail/oilsdetail';
import { SearchPage } from '../../pages/search/search';
import { ConferenceData } from '../../providers/conference-data';
/*
  Generated class for the Oils page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-oils',
  templateUrl: 'oils.html'
})
export class OilsPage {

  id;
  getList=[];
  Isdata:boolean = false;
  perPage = 1000;
  colorCode = ['#f1b136','#6ab5b1','#69344d','#7c57e4','#eb3c75','#f1b136','#6ab5b1','#69344d','#7c57e4','#eb3c75','#eb3c75','#f1b136','#6ab5b1','#69344d']


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

    this.id=this.navParams.get('id');
    this.getOilsPage();
  }

  getOilsPage(){

      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });

      loader.present();

      this.confData.get('getreceiptbyoil/'+this.id+'/'+this.perPage).subscribe(getData => {
         
          this.Isdata = false;
           
          if(getData.status){

            this.getList = getData.data.data;

            console.log(this.getList);
            
            for (var key in this.getList) {
              
              this.getList[key].color = this.colorCode[Math.round(Math.random()*12)];
              this.getList[key].companion_oils = this.htmlToPlaintext(this.getList[key].companion_oils);
            }

            if(this.getList.length==0){
              this.Isdata = true
            }

          }

          loader.dismiss();

      });

    }

    htmlToPlaintext(text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }

    openoilsdetailpage(data) {
      
      
      this.navCtrl.push(OilsdetailPage, {
        id:data.id
      });

    }

    opensearchpage() {

      this.navCtrl.push(SearchPage);

    }

}
