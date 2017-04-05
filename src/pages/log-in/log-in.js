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
import { Nav } from 'ionic-angular';
import { GettingStartedPage } from '../../pages/getting-started/getting-started';
import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
import { SchdLocation } from '../../services/schd-location';
import { AlertController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
var LogInPage = (function () {
    function LogInPage(backEndService, schdErrorHandler, schdLocation, thisNav, alertCtrl) {
        this.backEndService = backEndService;
        this.schdErrorHandler = schdErrorHandler;
        this.schdLocation = schdLocation;
        this.thisNav = thisNav;
        this.alertCtrl = alertCtrl;
        this.jwtHelper = new JwtHelper();
        this.myNav = thisNav;
    }
    LogInPage.prototype.loginThisUser = function () {
        var _this = this;
        this.backEndService
            .loginTheUser(this.loginUser)
            .then(function (res) {
            //console.log(this.backEndService.jwtToken);
            _this.myNav.setRoot(GettingStartedPage);
        })
            .catch(function (error) {
            _this.schdErrorHandler.showSchdError(error);
        });
    };
    LogInPage.prototype.openFacebook = function () {
        this.backEndService.facebookSignUp(this.loginUser.username, this.loginUser.password);
    };
    LogInPage.prototype.toastTest = function () {
        //this.schdLocation.toastGeo(this.myNav);
    };
    LogInPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loginUser = {
            name: '',
            password: ''
        };
        this.backEndService
            .getBackEndToken()
            .then(function (res) {
            _this.myResponse = res;
            return _this.backEndService.getSavedJwt();
        })
            .then(function (res) {
            _this.myToken = _this.backEndService.jwtToken;
            if (_this.backEndService.isLoggedIn()) {
                _this.myNav.setRoot(GettingStartedPage);
            }
        })
            .catch(function (error) {
            _this.schdErrorHandler.showSchdError(error);
        });
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
        Nav,
        AlertController])
], LogInPage);
export { LogInPage };
//# sourceMappingURL=log-in.js.map