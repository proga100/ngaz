import { Component } from '@angular/core';
import { NavController,App,NavParams,ModalController,LoadingController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { serverDetails } from '../../providers/config';
import { CommentsModalComponent } from '../../components/comments-modal/comments-modal';
import { UserData } from '../../providers/user-data';

/*
  Generated class for the Oilsdetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-oilsdetail',
  templateUrl: 'oilsdetail.html'
})

export class OilsdetailPage {

  id:any;
  Isloading:boolean=false;
  getList: {scientific_name?:string, benefits?:string, aromatic?:boolean,file_path?:string} = {};
  currentUser:{regdate?:any,id?:any, email?:any,all_month?:any,all_year?:any,fitness_month?:any,food_month?:any,homecare_month?:any,motherchild_month?:any,wellness_month?:any} = {};

  constructor(
    public navCtrl: NavController,
    public app: App,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public confData: ConferenceData,
    public userData: UserData,
   ){

    }

  ionViewDidLoad() {

      this.id=this.navParams.get('id');

      this.currentUser=this.userData.getUserData();
      
      

      this.getOilDetails();

    
  }

  getOilDetails(){

      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });

      loader.present();

      this.confData.get('getoilbyid/'+this.id).subscribe(getData => {
          
         
          this.Isloading = true;
          
          if(getData.status){

            this.getList = getData.data.conditionlist;
            
            if(this.getList.file_path!=null){

                this.getList.file_path = serverDetails.domainUrl+this.getList.file_path;
                console.log(this.getList.file_path);
            }

            
          }

          loader.dismiss();

      });

  }

  opencomments() {

    this.app.getRootNav().push(CommentsModalComponent,{"id": this.id});
  //  let modal = this.modalCtrl.create(CommentsModalComponent,{"id": this.id});
    //modal.present();

  }

}
