var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../sign-up/sign-up';
import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
import { SchdLocation } from '../../services/schd-location';
import { SchdFacebook } from '../../services/schd-facebook';
import { NavController, AlertController } from 'ionic-angular';
var LogInPage = (function () {
    function LogInPage(backEndService, schdErrorHandler, schdLocation, schdFacebook, navCtrl, alertCtrl) {
        this.backEndService = backEndService;
        this.schdErrorHandler = schdErrorHandler;
        this.schdLocation = schdLocation;
        this.schdFacebook = schdFacebook;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loading = false;
    }
    LogInPage.prototype.loginWithPassword = function () {
        var _this = this;
        this.backEndService
            .loginWithPassword(this.loginUser)
            .then(function (res) {
            //console.log(this.backEndService.jwtToken);
            _this.navCtrl.setRoot(TabsPage);
        })
            .catch(function (error) {
            _this.schdErrorHandler.showSchdError(error);
        });
    };
    LogInPage.prototype.loginWithFacebook = function () {
        var _this = this;
        this.schdFacebook.loginWithFacebook()
            .then(function (res) {
            if (res.status == 'connected') {
                _this.loginUser.facebook = res.authResponse.userID;
            }
            return _this.backEndService.loginWithFacebook(_this.loginUser);
        })
            .then(function (res) {
            _this.navCtrl.setRoot(TabsPage);
            console.log(res);
        })
            .catch(function (error) {
            _this.schdErrorHandler.showSchdError(error);
        });
    };
    LogInPage.prototype.signUp = function () {
        this.navCtrl.push(SignUpPage);
    };
    LogInPage.prototype.toastTest = function () {
        //this.schdLocation.toastGeo(this.myNav);
    };
    LogInPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.loginUser = {
            name: '',
            password: ''
        };
        // this.backEndService.getBackEndToken();
        this.backEndService
            .getBackEndToken()
            .then(function (res) {
            //this.myToken = this.jwtHelper.getTokenExpirationDate(this.backEndService.jwtToken);
            _this.myResponse = res;
        })
            .catch(function (error) {
            _this.schdErrorHandler.showSchdError(error);
        })
            .then(function (res) {
            return _this.backEndService.getSavedJwt();
        })
            .then(function (res) {
            /* let alert = this.alertCtrl.create({
                 title: 'Hey',
                 subTitle: 'Got',
                 buttons: [{
                            text: 'OK',
                            
                          }]
               });
               alert.present();*/
            _this.myToken = _this.backEndService.getExpiryDate();
            if (_this.backEndService.isLoggedIn()) {
                _this.navCtrl.setRoot(TabsPage);
                //this.loading = false;
                return Promise.resolve();
            }
            _this.loading = false;
            return Promise.resolve();
        });
        //.then(() => ;
        this.schdErrorHandler.checkWeb();
        this.schdLocation.checkGeo();
        this.schdLocation.monitorGeo();
    };
    return LogInPage;
}());
LogInPage = __decorate([
    Component({
        templateUrl: 'log-in.html'
    }),
    __metadata("design:paramtypes", [BackEndService,
        SchdErrorHandler,
        SchdLocation,
        SchdFacebook,
        NavController,
        AlertController])
], LogInPage);
export { LogInPage };
//# sourceMappingURL=log-in.js.map