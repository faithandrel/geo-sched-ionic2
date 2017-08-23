var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
import { SchdLocation } from '../../services/schd-location';
/*
  Generated class for the AddArticle component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
var AddArticleComponent = (function () {
    function AddArticleComponent(viewCtrl, formBuilder, backEndService, schdErrorHandler, schdLocation) {
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.backEndService = backEndService;
        this.schdErrorHandler = schdErrorHandler;
        this.schdLocation = schdLocation;
        this.article = this.formBuilder.group({
            title: ['', Validators.required],
            author: ['', Validators.required],
            contentBody: ['', Validators.required],
            articleType: ['', Validators.required],
            recurring: ['false']
        });
    }
    AddArticleComponent.prototype.saveForm = function () {
        var _this = this;
        console.log(this.article.value);
        var item = {};
        this.newItem = {
            title: this.article.get('title').value,
            content: this.article.get('contentBody').value,
        };
        this.schdLocation.checkGeo()
            .then(function (res) {
            return _this.schdLocation.getGeo();
        })
            .then(function (res) {
            item = Object.assign(_this.newItem, res);
            return _this.backEndService.saveItem(item);
        })
            .then(function (res) {
            _this.schdErrorHandler.showSchdError(res);
        })
            .catch(function (error) {
            _this.schdErrorHandler.showSchdError(error);
        });
    };
    AddArticleComponent.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    return AddArticleComponent;
}());
AddArticleComponent = __decorate([
    Component({
        selector: 'add-article',
        templateUrl: 'add-article.html'
    }),
    __metadata("design:paramtypes", [ViewController,
        FormBuilder,
        BackEndService,
        SchdErrorHandler,
        SchdLocation])
], AddArticleComponent);
export { AddArticleComponent };
//# sourceMappingURL=add-article.js.map