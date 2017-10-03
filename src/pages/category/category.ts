import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  feedTitle: string;  
  feedType: string;
  backEndFunction: any;
  items: any;
  

  constructor(private navCtrl: NavController, 
                      navParams: NavParams, 
              public loadingCtrl: LoadingController,
              private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler) { 
    this.feedTitle = 'Near You';
    this.feedType  = 'news';
    

    let feedTitle = navParams.get('title');
    let feedType  = navParams.get('type');

    if(feedTitle != undefined && feedType != undefined) {
      this.feedTitle = feedTitle;
      this.feedType  = feedType;
    }

    this.refreshPage();
  }

  refreshPage() {
    this.callBackEndFunction().then(res => {
      this.items = res;
    })
    .catch(error => {
        this.schdErrorHandler.showSchdError(error);
    });
  }

  callBackEndFunction() {
    if(this.feedType == 'news') {
      return this.backEndService.getItems();
    }
    if(this.feedType == 'emoji') {
      return this.backEndService.getEmojiFeed(this.feedTitle);
    }
  }

}
