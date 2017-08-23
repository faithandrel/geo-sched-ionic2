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
import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
import { SchdFacebook } from '../../services/schd-facebook';
import { NavController, AlertController } from 'ionic-angular';
var SignUpPage = (function () {
    function SignUpPage(backEndService, schdErrorHandler, schdFacebook, navCtrl, alertCtrl) {
        this.backEndService = backEndService;
        this.schdErrorHandler = schdErrorHandler;
        this.schdFacebook = schdFacebook;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.emailSignup = false;
    }
    SignUpPage.prototype.facebookSignUp = function () {
        var _this = this;
        this.schdFacebook.loginWithFacebook()
            .then(function (res) {
            if (res.status == 'connected') {
                _this.signUpUser.facebook = res.authResponse.userID,
                    _this.signUpUser.fbToken = res.authResponse.accessToken;
            }
            _this.myResponse = JSON.stringify(_this.signUpUser);
            return _this.backEndService.facebookSignUp(_this.signUpUser);
        })
            .then(function (res) {
            console.log(res);
        })
            .catch(function (error) {
            _this.schdErrorHandler.showSchdError(error);
        });
    };
    SignUpPage.prototype.openEmailSection = function () {
        this.emailSignup = true;
    };
    SignUpPage.prototype.closeEmailSection = function () {
        this.emailSignup = false;
    };
    SignUpPage.prototype.ngOnInit = function () {
        this.signUpUser = {
            name: '',
            password: '',
            email: ''
        };
    };
    return SignUpPage;
}());
SignUpPage = __decorate([
    Component({
        templateUrl: 'sign-up.html'
    }),
    __metadata("design:paramtypes", [BackEndService,
        SchdErrorHandler,
        SchdFacebook,
        NavController,
        AlertController])
], SignUpPage);
export { SignUpPage };
//# sourceMappingURL=sign-up.js.map