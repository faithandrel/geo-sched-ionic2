var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { ViewController, Slides, NavParams } from 'ionic-angular';
/*
  Generated class for the Article component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
var ArticleComponent = (function () {
    function ArticleComponent(viewCtrl, params) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.article = params.get('article');
        this.slideCount = 1;
        this.numLikes = 14;
        this.sliderOptions = {
            pager: false,
            autoplay: 0,
            loop: false,
            initialSlide: 0,
            speed: 300,
            direction: 'horizontal'
        };
        setTimeout(function () {
            _this.slider.slideTo(1, 300);
        }, 750);
    }
    ArticleComponent.prototype.close = function () {
        var _this = this;
        this.slider.slideTo(0, 300);
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 750);
    };
    ArticleComponent.prototype.addLikes = function () {
        this.numLikes += 1;
    };
    ArticleComponent.prototype.onSlideChanged = function (index) {
        this.slideCount = index + 1;
    };
    return ArticleComponent;
}());
__decorate([
    ViewChild('mySlider'),
    __metadata("design:type", Slides)
], ArticleComponent.prototype, "slider", void 0);
ArticleComponent = __decorate([
    Component({
        selector: 'article',
        templateUrl: 'article.html'
    }),
    __metadata("design:paramtypes", [ViewController, NavParams])
], ArticleComponent);
export { ArticleComponent };
//# sourceMappingURL=article.js.map