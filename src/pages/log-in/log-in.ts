import {Component, OnInit, ViewChild} from "@angular/core";
import {Nav} from 'ionic-angular';
import {GettingStartedPage} from '../../pages/getting-started/getting-started';

import {BackEndService} from '../../services/back-end-service';
import {SchdErrorHandler} from '../../services/schd-error-handler';
import {SchdLocation} from '../../services/schd-location';

import { AlertController } from 'ionic-angular';


@Component({
  templateUrl: 'log-in.html'
})
export class LogInPage implements OnInit {
  // @ViewChild(Nav) nav: Nav;

  loginUser: any;
  myError: any;
  myResponse: any;
  myNav: any;
  myToken: any;
  
  constructor(private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler,
              private schdLocation: SchdLocation,
              private thisNav: Nav,
              public alertCtrl: AlertController) {
    this.myNav = thisNav;
  }
  
  
  loginThisUser() {
    this.backEndService
        .loginTheUser(this.loginUser)
        .then(res => {
            //console.log(this.backEndService.jwtToken);
            this.myNav.setRoot(GettingStartedPage);
          })
        .catch(error => {
            this.schdErrorHandler.showSchdError(error);
        });

  }
  
  openFacebook() {
    this.backEndService.facebookSignUp(this.loginUser.username, this.loginUser.password);
  }
  
  toastTest() {
    //this.schdLocation.toastGeo(this.myNav);
  }
  
  ngOnInit() {
 
    this.loginUser = {
      name: '',
      password: ''
    };
    
    this.backEndService
        .getBackEndToken()
         .then(res => {
          this.myResponse = res;
          return this.backEndService.getSavedJwt();
         })
        .then(res => {  
            this.myToken = this.backEndService.jwtToken;
            if(this.backEndService.isLoggedIn()) {
              this.myNav.setRoot(GettingStartedPage);
            }         
          })       
        .catch(error => {
            this.schdErrorHandler.showSchdError(error);
        });
       
    this.schdErrorHandler.checkWeb();
    
    this.schdLocation.checkGeo();
    
    this.schdLocation.monitorGeo();
  }
  
}
