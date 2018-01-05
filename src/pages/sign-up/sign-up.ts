import { Component, OnInit } from "@angular/core";

import { TabsPage } from '../tabs/tabs';

import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
import { SchdFacebook } from '../../services/schd-facebook';

import { NavController, AlertController } from 'ionic-angular';


@Component({
  templateUrl: 'sign-up.html'
})
export class SignUpPage implements OnInit {

  emailSignup: boolean = false;
  signUpUser: any;
  myResponse: any;
  
  constructor(private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler,
              private schdFacebook: SchdFacebook,
              private navCtrl: NavController,
              public alertCtrl: AlertController) {

  }
  
  facebookSignUp() {
    this.schdFacebook.loginWithFacebook()
        .then(res => {  
        	if(res.status != 'connected') {
        	  Promise.reject('Facebook not connected.')
        	}
          this.signUpUser.facebook = res.authResponse.userID,
          this.signUpUser.fbToken  = res.authResponse.accessToken
        	this.myResponse = JSON.stringify(this.signUpUser);
        	return this.backEndService.facebookSignUp(this.signUpUser);
        })          
        /*.catch(error => {
            this.schdErrorHandler.showSchdError(error);
        })*/
        .then(res => {  
            console.log(res);
        })
        .catch(error => {
            this.schdErrorHandler.showSchdError(error);
        });
  }

  openEmailSection()  {
  	this.emailSignup = true;
  }
  
  closeEmailSection() {
  	this.emailSignup = false;
  }

  ngOnInit() {
    this.signUpUser = {
      name: '',
      password: '',
      email: ''
    };
  }
  
}
