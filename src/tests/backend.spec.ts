import {BackEndService} from '../services/back-end-service';

import { Storage } from '@ionic/storage';
import { Headers, Http, Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import { AlertController } from 'ionic-angular';

let backend = null;

describe('Backend Service', () => {

	beforeEach(() => {
     // backend = new BackEndService(new Http, new Storage, new AlertController);
    });
 
    it('should correctly add numbers', () => {
 
        expect(1 + 1).toBe(2);
 
    });
 
});