var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LogInPage } from '../pages/log-in/log-in';
import { GettingStartedPage } from '../pages/getting-started/getting-started';
import { ListPage } from '../pages/list/list';
import { DisplayMapPage } from '../pages/display-map/display-map';
import { BackEndService } from '../services/back-end-service';
import { SchdErrorHandler } from '../services/schd-error-handler';
import { SchdLocation } from '../services/schd-location';
import { IonicStorageModule } from '@ionic/storage';
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
            GettingStartedPage,
            ListPage,
            DisplayMapPage
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            IonicStorageModule.forRoot()
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            LogInPage,
            GettingStartedPage,
            ListPage,
            DisplayMapPage
        ],
        providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
            { provide: BackEndService, useClass: BackEndService },
            { provide: SchdErrorHandler, useClass: SchdErrorHandler },
            { provide: SchdLocation, useClass: SchdLocation }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map