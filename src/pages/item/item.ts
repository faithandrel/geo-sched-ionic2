import { Component } from "@angular/core";
import { NavController, NavParams, Nav, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';
import { SchdLocation } from '../../services/schd-location';


@Component({
  templateUrl: 'item.html'
})
export class ItemPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  myResults: any;
  comment: any;
  commentForm: any;
  
  constructor(private nav: NavController, 
                      navParams: NavParams,
              private myNav: Nav,
              public loadingCtrl: LoadingController,
              private backEndService: BackEndService,
              private formBuilder: FormBuilder,
              private schdLocation: SchdLocation,
              private schdErrorHandler: SchdErrorHandler) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.myResults = JSON.stringify(this.selectedItem);
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
    
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.nav.push(ItemPage, {
      item: item
    });
  }
  
  itemsTest() {
    let loader = this.loadingCtrl.create({content: 'Loading...'});
    loader.present()

    let newItem = {
      title: '',
      content: this.commentForm.get('content').value,
      item_id: this.selectedItem.id
    };

    this.schdLocation.checkGeo()
    .then(res => {
      return this.schdLocation.getGeo();
    })
    .then(res => {
      let item = Object.assign(newItem, res);
      return this.backEndService.saveItem(item);
    })
    .then(res => {
      return this.backEndService.getSingleItem(this.selectedItem.id);
    })
    .then(res => {
      this.selectedItem = res;
      loader.dismiss();
    })
    .catch(error => {
        this.schdErrorHandler.showSchdError(error);
    });
  }
}
