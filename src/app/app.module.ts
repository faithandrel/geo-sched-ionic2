import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {LogInPage} from '../pages/log-in/log-in';
import {GettingStartedPage} from '../pages/getting-started/getting-started';
import {ListPage} from '../pages/list/list';
import {DisplayMapPage} from '../pages/display-map/display-map';


import {BackEndService} from '../services/back-end-service';
import {SchdErrorHandler} from '../services/schd-error-handler';
import {SchdLocation} from '../services/schd-location';
import {IonicStorageModule} from '@ionic/storage';


@NgModule({
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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              {provide: BackEndService, useClass: BackEndService},
              {provide: SchdErrorHandler, useClass: SchdErrorHandler},
              {provide: SchdLocation, useClass: SchdLocation}]
})
export class AppModule {}
