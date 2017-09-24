import { Component } from "@angular/core";
import { NavController, NavParams, Nav, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
//import { Geolocation } from '@ionic-native/geolocation'
import { Geolocation, Diagnostic } from 'ionic-native';

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
              public toastCtrl: ToastController,
              private backEndService: BackEndService,
              private formBuilder: FormBuilder,
              //private geolocation: Geolocation,
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

    //TODO: make service to handle detection of geo
    Diagnostic.registerLocationStateChangeHandler(function(){
      console.log('Toggled location!');
      location.reload();
     /*Geolocation.getCurrentPosition().then((resp) => {
        console.log('Test geo'+ resp.coords.latitude);
      }).catch((error) => {
        console.log('Error getting location', error);
      });*/
      
    });
  }

  itemTapped() {
    let loader = this.loadingCtrl.create({content: 'Loading...'});
    loader.present()
    Geolocation.getCurrentPosition().then((resp) => {
      loader.dismiss();
      let toast = this.toastCtrl.create({
          message: 'Test Geo '+resp.coords.latitude,
          duration: 9000,
        });
        toast.present();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  
  itemsTest() {
    let loader = this.loadingCtrl.create({content: 'Loading...'});
    loader.present();

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
