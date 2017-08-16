import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SchdStorage {

	localStorage: Storage;

	constructor(private storage: Storage) {
		storage.ready().then(() => {
	       this.localStorage = storage;
	    })
	    .catch(this.handleError)
	}

	getSavedJwt() {
	    return this.localStorage.get('id_token');
	}

	setJwt(token) {
	    this.localStorage.set('id_token', token);
	}

	private handleError(error: any) {
	    return Promise.reject(error.message || error);
	 }
  
}