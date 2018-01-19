import { Component, OnInit, ViewChild } from "@angular/core";

import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../sign-up/sign-up';

import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
import { SchdLocation } from '../../services/schd-location';
import { SchdFacebook } from '../../services/schd-facebook';
import { MojcConfiguration } from '../../services/mojc-configuration';

import { NavController, AlertController } from 'ionic-angular';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'log-in.html'
})
export class LogInPage implements OnInit {
  // @ViewChild(Nav) nav: Nav;

  loginUser: any;
  myError: any;
  myResponse: any;
  loading: boolean = false;
  myToken: any;
  pushObject: PushObject;
  
  constructor(private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler,
              private schdLocation: SchdLocation,
              private schdFacebook: SchdFacebook,
              private mojcConfig: MojcConfiguration,
              private navCtrl: NavController,
              public alertCtrl: AlertController,
              public push: Push) {

    this.loginUser = {
      name: '',
      password: '',
      deviceToken: ''
    };

    //Get device token
    const options: PushOptions = {
      android: {
        senderID: '658412190684'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    this.pushObject = this.push.init(options);

    this.pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      this.loginUser.deviceToken = data.registrationId;
    });

  }
  
  loginTheUser() {
    this.navCtrl.setRoot(TabsPage);
    this.initPushNotification(); 
    this.mojcConfig.runChecksOnInterval();
  }

  initPushNotification() {
    this.pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              //this.nav.push(DetailsPage, { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.navCtrl.push(TabsPage);
        console.log('Push notification clicked');
      }
    });

    this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }

  loginWithPassword() {
    this.backEndService
        .loginWithPassword(this.loginUser)
        .then(res => {
            this.loginTheUser();
          })
        .catch(error => {
            this.schdErrorHandler.showSchdError(error);
        });

  }

  loginWithFacebook() {   
     this.schdFacebook.loginWithFacebook()
        .then(res => { 
          if(res.status != 'connected') {
            Promise.reject('Facebook not connected.');
          } 
          this.loginUser.facebook = res.authResponse.userID;          
          return this.backEndService.loginWithFacebook(this.loginUser);
        })          
        .then(res => {  
            this.loginTheUser();           
        })
        .catch(error => {
            this.schdErrorHandler.showSchdError(error);
        })
  }
  
  signUp() {
    this.navCtrl.push(SignUpPage);
  }
  
  toastTest() {
    //this.schdLocation.toastGeo(this.myNav);
  }
  
  ngOnInit() {
    this.loading = true;

    this.backEndService
        .getBackEndToken()
        .then(res => {  
            this.myResponse = res;
          })          
        .catch(error => {
            this.schdErrorHandler.showSchdError(error);
        })
        .then(res => {  
            return this.backEndService.getSavedJwt();
        })
        .then(res => {      
            if(this.backEndService.isLoggedIn()) {
              this.loginTheUser();
              return Promise.resolve();
            } 
            this.loading = false;
            return Promise.resolve();
        });
        
    
    this.schdErrorHandler.checkWeb();
    
    this.schdLocation.checkGeo();
    
    this.schdLocation.monitorGeo();
  }
  
}
