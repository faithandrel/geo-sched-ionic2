import { Injectable } from '@angular/core';

import { BackEndService } from './back-end-service';

@Injectable()
export class MojcNotification {
  	
  	counter: number = 0;
	oldNotifications: Array<any> = [];
	newNotifications: Array<any> = [];
	readNotifications: Array<any> = [];

	constructor(private backEndService: BackEndService) {
	}

	getAllNotifications(): Promise<any> {
	  	return this.backEndService
	        .getAllNotifications()
	        .then(res => {  	
	        	this.counter 	      = res.new.length;              
	            this.newNotifications = res.new;
	            this.oldNotifications = res.old;
	            return res;
	         })  
          	.catch(this.handleError);
	}

	getNewNotifications(): Promise<any> {
	  	return this.backEndService
	        .getNewNotifications()
	        .then(res => {
	        	this.counter 	      = res.length;  	           	
	            this.newNotifications = res;
	            return res;
	         })  
          	.catch(this.handleError);
	}

	markAsRead(): Promise<any> {
		var readNotifs = [];

		for(var key in this.newNotifications) {
			//check that notif not in old
			var currentNotification = this.newNotifications[key];
			var found = this.oldNotifications.find(function(notification) {
			  return notification.tag == currentNotification.tag;
			}, currentNotification);

			if(found == undefined) {
				currentNotification.read_at = Date.now();
				readNotifs.push(currentNotification.tag);
				this.readNotifications.push(currentNotification);
			}
		}

		return this.backEndService
	        .sendReadNotifications(readNotifs) 
	        .then(res => {  	           	
	            this.counter = 0;
	         })  
          	.catch(this.handleError);;
	}

	clearNewNotifications() {
		for(var i=this.readNotifications.length; i > 0; i--) {
			this.oldNotifications.unshift(this.readNotifications[(i-1)]);
		}

		this.readNotifications = [];
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

  
}