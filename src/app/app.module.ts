import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {LogInPage} from '../pages/log-in/log-in';
import {GettingStartedPage} from '../pages/getting-started/getting-started';
import {ListPage} from '../pages/list/list';
import {DisplayMapPage} from '../pages/display-map/display-map';
import { ProfilePage } from './../pages/profile/profile';
import { CategoryPage } from './../pages/category/category';
import { FeedPage } from './../pages/feed/feed';
import { InterestsPage } from './../pages/interests/interests';
import { TabsPage } from '../pages/tabs/tabs';

import {BackEndService} from '../services/back-end-service';
import {SchdErrorHandler} from '../services/schd-error-handler';
import {SchdLocation} from '../services/schd-location';
import {IonicStorageModule} from '@ionic/storage';

import { AddArticleComponent } from './../components/add-article/add-article';
import { ArticleComponent } from './../components/article/article';


@NgModule({
  declarations: [
    MyApp,
    LogInPage,
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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              {provide: BackEndService, useClass: BackEndService},
              {provide: SchdErrorHandler, useClass: SchdErrorHandler},
              {provide: SchdLocation, useClass: SchdLocation}]
})
export class AppModule {}
