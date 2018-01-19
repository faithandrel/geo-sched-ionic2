import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MojcNotification } from '../../services/mojc-notification';
import { SchdErrorHandler } from '../../services/schd-error-handler';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

	myResponse: any;

  	constructor(public navCtrl: NavController,
  			  private notification: MojcNotification,
  			  private schdErrorHandler: SchdErrorHandler) { }

	ionViewDidEnter() {
	    /*this.notification
	        .markAsRead()
	        .then(res => {  
	            this.myResponse = JSON.stringify(res);
	         })          
	        .catch(error => {
	            this.schdErrorHandler.showSchdError(error);
	        });*/
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
}
