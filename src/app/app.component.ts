import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LogInPage } from '../pages/log-in/log-in';
import { ListPage } from '../pages/list/list';
import { DisplayMapPage } from '../pages/display-map/display-map';
import { GettingStartedPage } from '../pages/getting-started/getting-started';

import { BackEndService } from '../services/back-end-service';
import { SchdLocation } from '../services/schd-location';
import { SchdErrorHandler } from '../services/schd-error-handler';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 
  rootPage: any;
  pages: Array<{title: string, component: any}>

  constructor(private platform: Platform,
              private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler,
              private schdLocation: SchdLocation) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'List', component: ListPage },
      { title: 'Map', component: DisplayMapPage }
    ];

    this.rootPage = LogInPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      Splashscreen.hide();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.schdLocation.monitorGeo();
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
