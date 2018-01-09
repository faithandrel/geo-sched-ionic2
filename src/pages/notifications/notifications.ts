import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BackEndService } from '../../services/back-end-service';
import { SchdErrorHandler } from '../../services/schd-error-handler';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

	myResponse: any;

  	constructor(public navCtrl: NavController,
  			  private backEndService: BackEndService,
  			  private schdErrorHandler: SchdErrorHandler) { }

	getNotifications() {
	  	this.backEndService
	        .getNotifications()
	        .then(res => {  
	            this.myResponse = JSON.stringify(res);
	         })          
	        .catch(error => {
	            this.schdErrorHandler.showSchdError(error);
	        });
	}

}
