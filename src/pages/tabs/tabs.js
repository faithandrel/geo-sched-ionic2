var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { InterestsPage } from './../interests/interests';
import { AddArticleComponent } from './../../components/add-article/add-article';
import { ModalController } from 'ionic-angular';
import { ProfilePage } from './../profile/profile';
import { CategoryPage } from './../category/category';
import { FeedPage } from './../feed/feed';
import { Component } from '@angular/core';
var TabsPage = (function () {
    function TabsPage(modalCtrl) {
        this.modalCtrl = modalCtrl;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.feedRoot = FeedPage;
        this.categoryRoot = CategoryPage;
        this.profileRoot = ProfilePage;
        this.interestsRoot = InterestsPage;
    }
    TabsPage.prototype.addArticle = function () {
        var modal = this.modalCtrl.create(AddArticleComponent);
        modal.present();
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Component({
        templateUrl: 'tabs.html'
    }),
    __metadata("design:paramtypes", [ModalController])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map