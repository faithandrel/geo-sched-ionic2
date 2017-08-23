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
import { Headers, Http, Request, RequestOptions, RequestMethod } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { SchdStorage } from './schd-storage';
var BackEndService = (function () {
    function BackEndService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.backEndUrl = 'http://e699065e.ngrok.io/'; // URL to web api
        this.jwtHelper = new JwtHelper();
    }
    BackEndService.prototype.getUrl = function () {
        return this.backEndUrl;
    };
    BackEndService.prototype.getBackEndToken = function () {
        var _this = this;
        return this.http.get(this.backEndUrl + 'test-token')
            .toPromise()
            .then(function (res) {
            var data = res.json();
            _this.backEndToken = data.token;
            //return res.json();
        })
            .catch(this.handleError);
    };
    BackEndService.prototype.addNewUser = function (name) {
        var body = "title=" + name + "&_token=" + this.backEndToken;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({
            method: RequestMethod.Post,
            url: this.backEndUrl + 'test-save-from-app',
            headers: myHeaders,
            body: body
        });
        var req = new Request(options);
        console.log(myHeaders);
        return this.http.request(req)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BackEndService.prototype.facebookSignUpDepcrecated = function (username, password) {
        var _this = this;
        var body = "username=" + username + "&password=" + password + "&_token=" + this.backEndToken;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({
            method: RequestMethod.Post,
            url: this.backEndUrl + 'fb-sign-up-from-app',
            headers: myHeaders,
            body: body,
        });
        var req = new Request(options);
        console.log(myHeaders);
        return this.http.request(req)
            .toPromise()
            .then(function (res) {
            _this.signupSession = res.json();
            open(_this.backEndUrl + 'sign-up-facebook?signup=' + _this.signupSession);
        })
            .catch(this.handleError);
    };
    BackEndService.prototype.facebookSignUp = function (newUser) {
        var body = "username=" + newUser.username +
            "&facebook=" + newUser.facebook +
            "&access=" + newUser.fbToken +
            "&_token=" + this.backEndToken;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({
            method: RequestMethod.Post,
            url: this.backEndUrl + 'fb-sign-up',
            headers: myHeaders,
            body: body,
        });
        var req = new Request(options);
        console.log(myHeaders);
        return this.http.request(req)
            .toPromise()
            .then(function (res) {
            console.log(res);
            //open(this.backEndUrl+'sign-up-facebook?signup='+this.signupSession);
        })
            .catch(this.handleError);
    };
    BackEndService.prototype.getItems = function () {
        var auth = 'Bearer ' + this.getJwtToken();
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        myHeaders.append('Authorization', auth);
        var options = new RequestOptions({
            method: RequestMethod.Get,
            url: this.backEndUrl + 'get-items',
            headers: myHeaders,
        });
        var req = new Request(options);
        return this.http.request(req)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BackEndService.prototype.saveItem = function (item) {
        var body = JSON.stringify(item);
        var auth = 'Bearer ' + this.getJwtToken();
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', auth);
        var options = new RequestOptions({
            method: RequestMethod.Post,
            url: this.backEndUrl + 'save-item',
            headers: myHeaders,
            body: body
        });
        console.log(auth);
        var req = new Request(options);
        return this.http.request(req)
            .toPromise()
            .then(function (res) { return JSON.stringify(res.json()); })
            .catch(this.handleError);
    };
    BackEndService.prototype.getSavedJwt = function () {
        var _this = this;
        return this.storage.getSavedJwt().then(function (profile) {
            _this.jwtToken = profile;
        });
    };
    BackEndService.prototype.getJwtToken = function () {
        return this.jwtToken;
    };
    BackEndService.prototype.getExpiryDate = function () {
        return this.jwtHelper.getTokenExpirationDate(this.jwtToken);
    };
    BackEndService.prototype.authSuccess = function (token) {
        this.storage.setJwt(token);
    };
    BackEndService.prototype.isLoggedIn = function () {
        return tokenNotExpired('id_token', this.jwtToken);
    };
    BackEndService.prototype.loginWithPassword = function (userObject) {
        var _this = this;
        var body = "username=" + userObject.username +
            "&password=" + userObject.password +
            "&_token=" + this.backEndToken;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({
            method: RequestMethod.Post,
            url: this.backEndUrl + 'password-log-in',
            headers: myHeaders,
            body: body,
        });
        var req = new Request(options);
        return this.http.request(req)
            .toPromise()
            .then(function (res) {
            var data = res.json();
            if (data.token != undefined) {
                _this.authSuccess(data.token);
                _this.jwtToken = data.token;
                return true;
            }
            else {
                return false;
            }
        })
            .catch(this.handleError);
    };
    BackEndService.prototype.loginWithFacebook = function (userObject) {
        var _this = this;
        var body = "username=" + userObject.username +
            "&facebook=" + userObject.facebook +
            "&_token=" + this.backEndToken;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({
            method: RequestMethod.Post,
            url: this.backEndUrl + 'facebook-log-in',
            headers: myHeaders,
            body: body,
        });
        var req = new Request(options);
        return this.http.request(req)
            .toPromise()
            .then(function (res) {
            var data = res.json();
            if (data.token != undefined) {
                _this.authSuccess(data.token);
                _this.jwtToken = data.token;
                return true;
            }
            else {
                return false;
            }
        })
            .catch(this.handleError);
    };
    BackEndService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return BackEndService;
}());
BackEndService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        SchdStorage])
], BackEndService);
export { BackEndService };
//# sourceMappingURL=back-end-service.js.map