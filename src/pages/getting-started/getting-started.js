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
import { BackEndService } from '../../services/back-end-service';
import { SchdLocation } from '../../services/schd-location';
var GettingStartedPage = (function () {
    function GettingStartedPage(backEndService, schdLocation, thisNav) {
        this.backEndService = backEndService;
        this.schdLocation = schdLocation;
        this.thisNav = thisNav;
        this.myNav = thisNav;
    }
    GettingStartedPage.prototype.saveThisItem = function () {
        var _this = this;
        this.schdLocation
            .getGeo()
            .then(function (res) {
            _this.myItem.latitude = res.latitude;
            _this.myItem.longitude = res.longitude;
            return _this.backEndService.saveItem(_this.myItem);
        })
            .then(function (res) { return _this.myResponse = JSON.stringify(res); })
            .catch(function (error) { return _this.myError = JSON.stringify(error); });
    };
    GettingStartedPage.prototype.toastTest = function () {
        location.reload();
    };
    GettingStartedPage.prototype.ngOnInit = function () {
        this.myItem = {
            title: '',
            content: '',
            latitude: 0,
            longitude: 0
        };
        this.myToken = this.backEndService.getExpiryDate();
        //this.schdLocation.toastGeo(this.myNav);
    };
    return GettingStartedPage;
}());
GettingStartedPage = __decorate([
    Component({
        templateUrl: 'getting-started.html'
    }),
    __metadata("design:paramtypes", [BackEndService,
        SchdLocation,
        Nav])
], GettingStartedPage);
export { GettingStartedPage };
//# sourceMappingURL=getting-started.js.map