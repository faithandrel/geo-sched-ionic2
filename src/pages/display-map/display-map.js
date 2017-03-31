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
import { GoogleMap, GoogleMapsLatLng } from 'ionic-native';
import { Geolocation } from 'ionic-native';
var DisplayMapPage = (function () {
    function DisplayMapPage() {
    }
    DisplayMapPage.prototype.getMap = function () {
        var _this = this;
        Geolocation.getCurrentPosition().then(function (resp) {
            _this.myLat = resp.coords.latitude;
            _this.myLong = resp.coords.longitude;
            var myLatLng = new GoogleMapsLatLng(_this.myLat, _this.myLong);
            var map = new GoogleMap('sch-google-map');
            map.setZoom(15);
            map.setCenter(myLatLng);
        }, function (error) {
            //SchdErrorHandler.showSchdError(error);
        });
    };
    DisplayMapPage.prototype.ngOnInit = function () {
    };
    return DisplayMapPage;
}());
DisplayMapPage = __decorate([
    Component({
        templateUrl: 'display-map.html'
    }),
    __metadata("design:paramtypes", [])
], DisplayMapPage);
export { DisplayMapPage };
//# sourceMappingURL=display-map.js.map