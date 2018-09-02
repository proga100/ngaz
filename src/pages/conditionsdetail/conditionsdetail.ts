import { Component } from '@angular/core';
import { NavController, App, NavParams, ModalController,LoadingController } from 'ionic-angular';
import { CommentsModalComponent } from '../../components/comments-modal/comments-modal';
import { ConferenceData } from '../../providers/conference-data';
import { serverDetails } from '../../providers/config';


/*
  Generated class for the Conditionsdetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-conditionsdetail',
  templateUrl: 'conditionsdetail.html'
})

export class ConditionsdetailPage {

  id:any;
  categoryid:any;
  title:any;
  Isloading:boolean=false;
  getList: {scientific_name?:string,file_path?:string} = {};
  constructor(
      public navCtrl: NavController, 
      public app: App,
      public navParams: NavParams,
      public modalCtrl: ModalController,
      public loadingCtrl: LoadingController,
      public confData: ConferenceData,
  ){}

  ionViewDidLoad() {

      this.id=this.navParams.get('id');
      this.categoryid=this.navParams.get('categoryid');

      if(this.categoryid==1){

        this.title = 'CONDITIONS DETAILS';

      }else if(this.categoryid==2){

        this.title = 'RECIPES DETAILS';

      }else if(this.categoryid==3){

        this.title = 'CONDITIONS DETAILS';

      }else if(this.categoryid==4){

        this.title = 'LOCATION';

      }else if(this.categoryid==5){

        this.title = 'CONDITIONS DETAILS';
      }

    this.getConditionDetails();
  }

  getConditionDetails(){

      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });

      loader.present();

      this.confData.get('getconditionbyid/'+this.id).subscribe(getData => {
          
          console.log(getData);
          this.Isloading = true;
          
          if(getData.status){

            this.getList = getData.data.conditionlist;
            console.log(this.getList);

            if(this.getList.file_path!=null){

                this.getList.file_path = serverDetails.domainUrl+this.getList.file_path;
                console.log(this.getList.file_path);
            }
             
          }

          loader.dismiss();

      });
  }

  openconditionscomments() {

    this.app.getRootNav().push(CommentsModalComponent,{"id": this.id});
	
	}

}
