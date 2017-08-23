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
import { Storage } from '@ionic/storage';
var SchdStorage = (function () {
    function SchdStorage(storage) {
        var _this = this;
        this.storage = storage;
        storage.ready().then(function () {
            _this.localStorage = storage;
        })
            .catch(this.handleError);
    }
    SchdStorage.prototype.getSavedJwt = function () {
        return this.localStorage.get('id_token');
    };
    SchdStorage.prototype.setJwt = function (token) {
        this.localStorage.set('id_token', token);
    };
    SchdStorage.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return SchdStorage;
}());
SchdStorage = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage])
], SchdStorage);
export { SchdStorage };
//# sourceMappingURL=schd-storage.js.map