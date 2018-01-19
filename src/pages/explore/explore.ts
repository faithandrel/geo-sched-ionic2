import { ArticleComponent } from './../../components/article/article';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { CategoryPage } from '../category/category';

import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {

  myTest: any;
  emojiArray: Array<any>;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler) { 
    this.refreshPage();
  }

  refreshPage() {
    this.backEndService
        .getExploreFeed()
        .then(res => {
          this.emojiArray = res;
        })
        .catch(error => {
            this.schdErrorHandler.showSchdError(error);
        });
  }

  openFeedForEmoji(emoji) {
    this.navCtrl.push(CategoryPage, { title: emoji, type: 'emoji' });
  }

}
