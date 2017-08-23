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
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ModalController } from 'ionic-angular';
/*
  Generated class for the Feed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var FeedPage = (function () {
    function FeedPage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.slideCount = 1;
        this.sliderOptions = {
            pager: true,
            autoplay: 0,
            loop: false,
            initialSlide: 0,
            speed: 300,
            direction: 'vertical'
        };
        this.articles = [
            {
                title: 'Lets not React',
                author: 'Craig Michaels',
                tags: ['React', 'JS'],
                img: 'm2.jpg'
            },
            {
                title: 'The Beauty of Ionic 2',
                author: 'Mark Ronson',
                tags: ['Hybrid', 'Mobile'],
                img: 'm1.jpg'
            },
            {
                title: 'Bi-Angular',
                author: 'James Coor',
                tags: ['Angular', 'JS'],
                img: 'm3.jpg'
            },
            {
                title: 'Its a Knockout',
                author: 'Geoff Jorge',
                tags: ['Knockout', 'JS'],
                img: 'm4.jpg'
            }
        ];
    }
    FeedPage.prototype.ionViewDidLoad = function () {
        console.log('Hello FeedPage Page');
    };
    FeedPage.prototype.openArticle = function (article) {
        var _this = this;
        this.articleOpen = true;
        var modal = this.modalCtrl.create(ArticleComponent, { article: article });
        setTimeout(function () {
            modal.present();
            _this.articleOpen = false;
        }, 500);
    };
    FeedPage.prototype.setClass = function () {
        var classes = {
            'article-open': this.articleOpen
        };
        return classes;
    };
    FeedPage.prototype.onSlideChanged = function (index) {
        this.slideCount = index + 1;
    };
    return FeedPage;
}());
__decorate([
    ViewChild('mySlider'),
    __metadata("design:type", Slides)
], FeedPage.prototype, "slider", void 0);
FeedPage = __decorate([
    Component({
        selector: 'page-feed',
        templateUrl: 'feed.html'
    }),
    __metadata("design:paramtypes", [NavController, ModalController])
], FeedPage);
export { FeedPage };
//# sourceMappingURL=feed.js.map