import { Component} from '@angular/core';
import { App,ToastController,LoadingController,NavController } from 'ionic-angular';
import { InAppPurchase } from 'ionic-native';
import { TabsPage } from '../../pages/tabs/tabs';
import { UserData } from '../../providers/user-data';
import { ConferenceData } from '../../providers/conference-data';
/*
  Generated class for the Buynow component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'buynow',
  templateUrl: 'buynow.html'
})
export class BuynowComponent {

  text: string;
  wellness:boolean = false;
  selectProduct:any=[];
  buynow:any =[];
  productModal:any;
  transactionList:any;
  diffDays:any;
  subscriber:boolean=false;
  transaction: {transactionId?: any, receipt?: any,signature?: any,userid?:any,amount?:any,product_id?:any} = {};
  currentUser:{transaction?:any,regdate?:any,id?:any, email?:any,all_month?:any,all_year?:any,fitness_month?:any,food_month?:any,homecare_month?:any,motherchild_month?:any,wellness_month?:any} = {};
  
  constructor(
     public app: App,
     public toastCtrl: ToastController, 
     public userData: UserData,
     public confData: ConferenceData,
     public loadingCtrl: LoadingController,
     public navCtrl: NavController) {
         
      this.currentUser=this.userData.getUserData();

      this.userData.getTransaction().then((getData) => {

        if(getData){
          
          this.subscriber = true;
          this.transactionList = getData;

        }else{

          
          let splitDate = this.currentUser.regdate.split('-');

          splitDate = splitDate[1]+"/"+splitDate[2]+"/"+splitDate[0];
          console.log(splitDate);

          var date1 = new Date(splitDate);
          var date2 = new Date();

          var timeDiff = Math.abs(date2.getTime() - date1.getTime());
          this.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

          this.subscriber = false;

        }

      });


    let data6 ={
      'name':'Monthly',
      'product_id':'buyallcategories_monthly',
      'price':'USD 2.99',
    }

    this.buynow.push(data6);

    let data7 ={
      'name':'Yearly',
      'product_id':'buyallcategories_yearly',
      'price':'USD 27',
    }

    this.buynow.push(data7);

    this.transaction.transactionId = '';
    this.transaction.receipt = '';
    this.transaction.signature = '';

    this.getProducts();

  }

  getProducts(){

     InAppPurchase
       .getProducts(['buyallcategories_monthly','buyallcategories_yearly'])
       .then((products) => {
         console.log(products);
       })
       .catch((err) => {
         console.log(err);
       });
  }

  checkProductId(data){

    this.selectProduct = [];
    this.selectProduct.push(data);
    console.log(this.selectProduct);

  }

  buyNowProcess(){


    if(this.selectProduct.length==1){

      InAppPurchase
        .subscribe(this.selectProduct[0].product_id)
        .then((data)=> {
          
          console.log('buynow proces===== one ========');
          console.log(data);
          this.transaction = data;
          this.addTransaction();

        })
        .catch((err)=> {
          console.log(err);
        });
    }else{

        let toast = this.toastCtrl.create({
        message: 'please select one product',
        duration: 3000,
        position: 'top',
        cssClass: 'error'
      });

      toast.present();
    }
    
  }

  addTransaction(){

     this.transaction.userid = this.currentUser.id;
     this.transaction.amount = this.selectProduct[0].price;
     this.transaction.product_id = this.selectProduct[0].product_id;

      console.log(this.transaction);

      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });

      loader.present();


      this.confData.post(this.transaction,'addtransacton').subscribe(getData => {
          
          console.log(getData);
          
          if(getData.status){

            this.confData.post('','getauthenticateuser').subscribe(getData => {

                if(getData){

                    this.currentUser = getData.data;
                    this.userData.login(getData.data);

                    this.presentToast('Successfully Purchased');
                    this.navCtrl.push(TabsPage);


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
                        }
                        
                        loader.dismiss();

                    },err => {

                      loader.dismiss();
                      console.log(err);
                
                    })


                }else{

                  loader.dismiss();
                }
            })

          }else{

            this.presentToast(getData.message);
            loader.dismiss();
          }

      });

  }

  presentToast(msg) {

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  closepage(){

    this.app.getRootNav().setRoot(TabsPage);
  }


}
