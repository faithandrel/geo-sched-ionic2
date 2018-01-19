import { Injectable } from '@angular/core';

import { BackEndService } from './back-end-service';

@Injectable()
export class MojcNotification {
  
	counter: any = 0;
	notifications: Array<any> = [];

	constructor(private backEndService: BackEndService) {
	}

	getAllNotifications(): Promise<any> {
	  	return this.backEndService
	        .getAllNotifications()
	        .then(res => {  
	            this.counter 	  += res.length;
	            this.notifications = this.notifications.concat(res);
	            return res;
	         })  
          	.catch(this.handleError);
	}

	getNewNotifications(): Promise<any> {
	  	return this.backEndService
	        .getNewNotifications()
	        .then(res => {  
	           	this.counter 	  += res.length;
	            this.notifications = this.notifications.concat(res);
	            return res;
	         })  
          	.catch(this.handleError);
	}

	markAsRead(): Promise<any> {
		var readNotifs = [];

		for(var key in this.notifications) {
			if(this.notifications[key].read_at == null) {
				readNotifs.push(this.notifications[key].tag);
			}
		}

		return this.backEndService
	        .sendReadNotifications(readNotifs)
	        .then(res => {  
	            this.counter = 0;
	         })  
          	.catch(this.handleError);
	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}

  
}