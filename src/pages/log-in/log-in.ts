import {Component, OnInit, ViewChild} from "@angular/core";

import {GettingStartedPage} from '../../pages/getting-started/getting-started';

import {BackEndService} from '../../services/back-end-service';
import {SchdErrorHandler} from '../../services/schd-error-handler';
import {SchdLocation} from '../../services/schd-location';

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
              private navCtrl: NavController,
              public alertCtrl: AlertController) {
    //this.myNav = thisNav;

    
  }
  
  
  loginThisUser() {
    this.backEndService
        .loginTheUser(this.loginUser)
        .then(res => {
            //console.log(this.backEndService.jwtToken);
            this.navCtrl.setRoot(GettingStartedPage);
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
              this.navCtrl.setRoot(GettingStartedPage);
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
