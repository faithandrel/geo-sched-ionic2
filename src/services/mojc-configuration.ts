import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MojcNotification } from './mojc-notification';


@Injectable()
export class MojcConfiguration {

	checkInterval: number = 60000;

	constructor(private notification: MojcNotification) {

	}

	runChecks() {
		this.notification.getNewNotifications(); 
	}

	runChecksOnInterval() {
		//this.runChecks();
		
	    let notifIntervalCheck = Observable.interval(this.checkInterval);
	    
	    notifIntervalCheck.subscribe(interval => {
			this.runChecks();
	    },
	    	err => { console.log(err); }
	    );
  	}

	private handleError(error: any) {
		return Promise.reject(error.message || error);
	}
}