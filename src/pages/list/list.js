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
import { NavController, NavParams, Nav } from 'ionic-angular';
import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
var ListPage = ListPage_1 = (function () {
    function ListPage(nav, navParams, myNav, backEndService, schdErrorHandler) {
        this.nav = nav;
        this.myNav = myNav;
        this.backEndService = backEndService;
        this.schdErrorHandler = schdErrorHandler;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        this.nav.push(ListPage_1, {
            item: item
        });
    };
    ListPage.prototype.itemsTest = function () {
        var _this = this;
        this.backEndService
            .getItems()
            .then(function (res) { return _this.myResults = res; })
            .catch(function (error) {
            _this.schdErrorHandler.showSchdError(error);
        });
    };
    return ListPage;
}());
ListPage = ListPage_1 = __decorate([
    Component({
        templateUrl: 'list.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        Nav,
        BackEndService,
        SchdErrorHandler])
], ListPage);
export { ListPage };
var ListPage_1;
//# sourceMappingURL=list.js.map