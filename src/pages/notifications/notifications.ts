import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ItemPage } from '../../pages/item/item';

import { BackEndService } from '../../services/back-end-service';
import { MojcNotification } from '../../services/mojc-notification';
import { SchdErrorHandler } from '../../services/schd-error-handler';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

	myResponse: any;

  	constructor(public navCtrl: NavController,
  				public loadingCtrl: LoadingController,
  			  private backEndService: BackEndService,
  			  private notification: MojcNotification,
  			  private schdErrorHandler: SchdErrorHandler) { }

	ionViewDidEnter() {
	    this.notification
	        .markAsRead()
	        .then(res => {  
	            this.myResponse = JSON.stringify(res);
	         })          
	        .catch(error => {
	            this.schdErrorHandler.showSchdError(error);
	        });
	}
	

	ionViewDidLeave() {
		this.notification.clearNewNotifications();
	}

	getNotifications() {
	  	this.notification
	        .getNewNotifications()
	        .then(res => {  
	            this.myResponse = JSON.stringify(res);
	         })          
	        .catch(error => {
	            this.schdErrorHandler.showSchdError(error);
	        });
	}

	refreshPage() {
    	this.notification.getAllNotifications()
	        .then(res => { 
	          return this.notification.markAsRead();
	        })          
	        .then(res => {  
	            this.myResponse = JSON.stringify(res);
	        })
	        .catch(error => {
	            this.schdErrorHandler.showSchdError(error);
	        });
  	}

  	//TODO: should be moved to service
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
