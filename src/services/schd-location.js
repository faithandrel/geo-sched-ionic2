var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { Geolocation, Diagnostic } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
var SchdLocation = (function () {
    function SchdLocation(toastCtrl, alertCtrl) {
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.locationStatus = false;
        this.myLocation = false;
        this.geoStream = false;
        this.geoStream = Geolocation.watchPosition();
    }
    SchdLocation.prototype.toastGeo = function () {
        var _this = this;
        var myGeo = Geolocation.watchPosition();
        myGeo.subscribe(function (position) {
            var toast = _this.toastCtrl.create({
                message: 'Geo ' + JSON.stringify(position),
                duration: 3000,
            });
            _this.myLocation = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            };
            toast.present();
        });
    };
    SchdLocation.prototype.monitorGeo = function () {
        var _this = this;
        this.geoStream.subscribe(function (position) {
            var toast = _this.toastCtrl.create({
                message: 'Geo ' + JSON.stringify(position),
                duration: 3000,
            });
            _this.myLocation = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            };
        });
    };
    SchdLocation.prototype.getGeo = function () {
        if (this.myLocation != false) {
            return Promise.resolve(this.myLocation);
        }
        else {
            return Promise.reject('Location not found.');
        }
        /*Geolocation.watchPosition().toPromise()
              .then(res => {
                 let toast = Toast.create({
                  message: 'Geo '+ JSON.stringify(res),
                  duration: 3000,
                });
                
                nav.present(toast);
              });*/
    };
    SchdLocation.prototype.checkGeo = function () {
        var _this = this;
        var locInterval = Observable.interval(10000);
        var previousStatus = this.locationStatus;
        locInterval.subscribe(function (position) {
            Diagnostic.isLocationEnabled().then(function (res) {
                _this.locationStatus = res;
                if (!res) {
                    var toast = _this.toastCtrl.create({
                        message: 'Please turn on your GPS.',
                        duration: 3000,
                    });
                    toast.present(toast);
                }
                return _this.getGeo();
            }).then(function (res) {
            }, function (err) {
                if (_this.locationStatus) {
                }
            });
        });
    };
    return SchdLocation;
}());
SchdLocation = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ToastController, AlertController])
], SchdLocation);
export { SchdLocation };
//# sourceMappingURL=schd-location.js.map