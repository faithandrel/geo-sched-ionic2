import { Component, OnInit, ViewChild } from "@angular/core";

import { GettingStartedPage } from '../getting-started/getting-started';
import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../sign-up/sign-up';

import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
import { SchdLocation } from '../../services/schd-location';
import { SchdFacebook } from '../../services/schd-facebook';

import { NavController, AlertController } from 'ionic-angular';


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
  
  constructor(private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler,
              private schdLocation: SchdLocation,
              private schdFacebook: SchdFacebook,
              private navCtrl: NavController,
              public alertCtrl: AlertController) {    
  }
  
  
  loginWithPassword() {
    this.backEndService
        .loginWithPassword(this.loginUser)
        .then(res => {
            //console.log(this.backEndService.jwtToken);
            this.navCtrl.setRoot(TabsPage);
          })
        .catch(error => {
            this.schdErrorHandler.showSchdError(error);
        });

  }

  loginWithFacebook() {
     this.schdFacebook.loginWithFacebook()
        .then(res => {  
          if(res.status == 'connected') {
            this.loginUser.facebook = res.authResponse.userID
          }
          return this.backEndService.loginWithFacebook(this.loginUser);
        })          
        .then(res => {  
            this.navCtrl.setRoot(TabsPage);
            console.log(res);
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

    this.loginUser = {
      name: '',
      password: ''
    };

   // this.backEndService.getBackEndToken();

    this.backEndService
        .getBackEndToken()
        .then(res => {  
            //this.myToken = this.jwtHelper.getTokenExpirationDate(this.backEndService.jwtToken);
            this.myResponse = res;
          })          
        .catch(error => {
            this.schdErrorHandler.showSchdError(error);
        })
        .then(res => {  
            return this.backEndService.getSavedJwt();
        })
        .then(res => {
          /* let alert = this.alertCtrl.create({
               title: 'Hey',
               subTitle: 'Got',
               buttons: [{
                          text: 'OK',
                          
                        }]
             });
             alert.present();*/
            this.myToken = this.backEndService.getExpiryDate();
            if(this.backEndService.isLoggedIn()) {
              this.navCtrl.setRoot(TabsPage);
              //this.loading = false;
              return Promise.resolve();
            } 
            this.loading = false;
            return Promise.resolve();
        });
        //.then(() => ;
    
    this.schdErrorHandler.checkWeb();
    
    this.schdLocation.checkGeo();
    
    this.schdLocation.monitorGeo();
  }
  
}
