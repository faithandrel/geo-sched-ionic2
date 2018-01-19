import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { Push } from '@ionic-native/push';

import { LogInPage}  from '../pages/log-in/log-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ItemPage } from '../pages/item/item';
import { ExplorePage } from '../pages/explore/explore';
import { DisplayMapPage } from '../pages/display-map/display-map';
import { ProfilePage } from './../pages/profile/profile';
import { CategoryPage } from './../pages/category/category';
import { NotificationsPage } from './../pages/notifications/notifications';
import { TabsPage } from '../pages/tabs/tabs';

import { BackEndService } from '../services/back-end-service';
import { SchdErrorHandler } from '../services/schd-error-handler';
import { SchdLocation } from '../services/schd-location';
import { SchdFacebook } from '../services/schd-facebook';
import { SchdStorage } from '../services/schd-storage';
import { MojcNotification } from '../services/mojc-notification';
import { MojcConfiguration } from '../services/mojc-configuration';

import { AddArticleComponent } from './../components/add-article/add-article';
import { ArticleComponent } from './../components/article/article';
import { FeedComponent } from './../components/feed-section/feed-section';


@NgModule({
  declarations: [
    MyApp,
    LogInPage,
    SignUpPage,
    ItemPage,
    ExplorePage,
    DisplayMapPage,
    CategoryPage,
    ProfilePage,
    TabsPage,
    NotificationsPage,
    ArticleComponent,
    AddArticleComponent,
    FeedComponent
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
    ItemPage,
    ExplorePage,
    DisplayMapPage,
    CategoryPage,
    ProfilePage,
    TabsPage,
    NotificationsPage,
    ArticleComponent,
    AddArticleComponent,
    FeedComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              {provide: BackEndService, useClass: BackEndService},
              {provide: SchdErrorHandler, useClass: SchdErrorHandler},
              {provide: SchdLocation, useClass: SchdLocation},
              {provide: Facebook, useClass: Facebook},
              {provide: Geolocation, useClass: Geolocation},
              {provide: Push, useClass: Push},
              {provide: SchdFacebook, useClass: SchdFacebook},
              {provide: SchdStorage, useClass: SchdStorage},
              {provide: MojcNotification, useClass: MojcNotification},
              {provide: MojcConfiguration, useClass: MojcConfiguration}]
})
export class AppModule {}
