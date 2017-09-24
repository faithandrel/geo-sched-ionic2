import { ArticleComponent } from './../../components/article/article';
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';

import { ItemPage } from '../item/item';

import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {

  myTest: any;
  emojiArray: any;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController,
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

}
