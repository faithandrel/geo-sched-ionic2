var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LogInPage } from '../pages/log-in/log-in';
import { ListPage } from '../pages/list/list';
import { DisplayMapPage } from '../pages/display-map/display-map';
import { GettingStartedPage } from '../pages/getting-started/getting-started';
import { BackEndService } from '../services/back-end-service';
import { SchdLocation } from '../services/schd-location';
import { SchdErrorHandler } from '../services/schd-error-handler';
var MyApp = (function () {
    function MyApp(platform, backEndService, schdErrorHandler, schdLocation) {
        this.platform = platform;
        this.backEndService = backEndService;
        this.schdErrorHandler = schdErrorHandler;
        this.schdLocation = schdLocation;
        this.rootPage = LogInPage;
        this.initializeApp();
        if (backEndService.isLoggedIn()) {
            this.rootPage = GettingStartedPage;
        }
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Getting Started', component: GettingStartedPage },
            { title: 'List', component: ListPage },
            { title: 'Map', component: DisplayMapPage }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            Splashscreen.hide();
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //this.schdLocation.monitorGeo();
            StatusBar.styleDefault();
        });
    };
    MyApp.prototype.openPage = function (navCtrl, page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        navCtrl.push(page);
    };
    return MyApp;
}());
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        BackEndService,
        SchdErrorHandler,
        SchdLocation])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map