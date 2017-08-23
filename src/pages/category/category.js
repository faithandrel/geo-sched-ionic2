var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArticleComponent } from './../../components/article/article';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CategoryPage = (function () {
    function CategoryPage(navCtrl, modalCtrl, backEndService, schdErrorHandler) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.backEndService = backEndService;
        this.schdErrorHandler = schdErrorHandler;
        this.category = 'travel';
        this.refreshPage();
    }
    CategoryPage.prototype.openArticle = function () {
        var modal = this.modalCtrl.create(ArticleComponent, {
            article: {
                title: 'Lets not React',
                author: 'Craig Michaels',
                tags: ['React', 'JS'],
                img: 'm2.jpg'
            }
        });
        modal.present();
    };
    CategoryPage.prototype.refreshPage = function () {
        var _this = this;
        this.backEndService
            .getItems()
            .then(function (res) {
            _this.items = res;
            _this.myTest = JSON.stringify(_this.items);
        })
            .catch(function (error) {
            _this.schdErrorHandler.showSchdError(error);
        });
    };
    CategoryPage.prototype.viewSingleItem = function (itemId) {
        this.navCtrl.push(ListPage, { item: itemId });
    };
    return CategoryPage;
}());
CategoryPage = __decorate([
    Component({
        selector: 'page-category',
        templateUrl: 'category.html'
    }),
    __metadata("design:paramtypes", [NavController,
        ModalController,
        BackEndService,
        SchdErrorHandler])
], CategoryPage);
export { CategoryPage };
//# sourceMappingURL=category.js.map