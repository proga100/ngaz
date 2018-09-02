import { Injectable } from '@angular/core';
import { SESSION_NAME } from './config';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {
  _favorites = [];
  getData:any;
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(userData) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('userData'+SESSION_NAME, userData);
   // this.setUsername(userData.name);
    this.setUserData(userData);
    this.events.publish('user:login',userData);
  };

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('userData'+SESSION_NAME);
    this.events.publish('user:logout');
  };

  setUsername(username) {
    this.storage.set('username', username);
  };

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  getCurrentUser(){

    return this.storage.get('userData'+SESSION_NAME).then((value) => {
      this.setUserData(value);
      return value;
    });


  }

  getCurrentTheme(){

    return this.storage.get('currentTheme'+SESSION_NAME).then((value) => {
        
        return value;
    });

  }



  setCurrentTheme(value){

    return this.storage.set('currentTheme'+SESSION_NAME,value);

  }

  getTransaction(){

    return this.storage.get('transaction'+SESSION_NAME).then((value) => {
        
        return value;
    });

  }

  

  setTransaction(value){

    return this.storage.set('transaction'+SESSION_NAME,value);

  }

 
  setUserData(value) 
  {

    if(value){

        if(value.token){

          this.getData = value;
          this.storage.set('userData'+SESSION_NAME, value);

        }else{

          value.token = this.getUserData().token;
          this.getData = value;
          this.storage.set('userData'+SESSION_NAME, value);
        }
    }
  }

  getUserData() {
     return this.getData;
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial() {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    })
  };
}
