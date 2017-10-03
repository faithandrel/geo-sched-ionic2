import { LoadingController, NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
import { ItemPage } from '../../pages/item/item';

@Component({
  selector: 'feed-section',
  templateUrl: 'feed-section.html'
})
export class FeedComponent {

  @Input() itemList: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private backEndService: BackEndService,
              private schdErrorHandler: SchdErrorHandler) {

  }

  viewSingleItem(itemId) {
    let loader = this.loadingCtrl.create({content: 'Loading...'});
    loader.present()
    this.backEndService
        .getSingleItem(itemId)
        .then(res => {
            this.navCtrl.push(ItemPage, { item: res });
            loader.dismiss();
        })
        .catch(error => {
          console.log(error);
            //this.schdErrorHandler.showSchdError(error);
        });
    
  }
}
