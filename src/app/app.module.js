var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { LogInPage } from '../pages/log-in/log-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { GettingStartedPage } from '../pages/getting-started/getting-started';
import { ListPage } from '../pages/list/list';
import { DisplayMapPage } from '../pages/display-map/display-map';
import { ProfilePage } from './../pages/profile/profile';
import { CategoryPage } from './../pages/category/category';
import { FeedPage } from './../pages/feed/feed';
import { InterestsPage } from './../pages/interests/interests';
import { TabsPage } from '../pages/tabs/tabs';
import { BackEndService } from '../services/back-end-service';
import { SchdErrorHandler } from '../services/schd-error-handler';
import { SchdLocation } from '../services/schd-location';
import { SchdFacebook } from '../services/schd-facebook';
import { SchdStorage } from '../services/schd-storage';
import { AddArticleComponent } from './../components/add-article/add-article';
import { ArticleComponent } from './../components/article/article';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            LogInPage,
            SignUpPage,
            GettingStartedPage,
            ListPage,
            DisplayMapPage,
            CategoryPage,
            ProfilePage,
            TabsPage,
            FeedPage,
            InterestsPage,
            ArticleComponent,
            AddArticleComponent
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            IonicStorageModule.forRoot()
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            LogInPage,
            SignUpPage,
            GettingStartedPage,
            ListPage,
            DisplayMapPage,
            CategoryPage,
            ProfilePage,
            TabsPage,
            FeedPage,
            InterestsPage,
            ArticleComponent,
            AddArticleComponent
        ],
        providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
            { provide: BackEndService, useClass: BackEndService },
            { provide: SchdErrorHandler, useClass: SchdErrorHandler },
            { provide: SchdLocation, useClass: SchdLocation },
            { provide: Facebook, useClass: Facebook },
            { provide: SchdFacebook, useClass: SchdFacebook },
            { provide: SchdStorage, useClass: SchdStorage }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map