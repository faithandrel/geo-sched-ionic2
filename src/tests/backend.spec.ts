import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../app/app.component';
import { LogInPage } from '../pages/log-in/log-in';

import {BackEndService} from '../services/back-end-service';
import {SchdErrorHandler} from '../services/schd-error-handler';
import {SchdLocation} from '../services/schd-location';
import {IonicStorageModule} from '@ionic/storage';

import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
 
let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

let backend: any;
 
describe('Service: Backend', () => {
 
    /*beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [MyApp],
 
            providers: 
            [ {provide: BackEndService, useClass: BackEndService},
              {provide: SchdErrorHandler, useClass: SchdErrorHandler},
              {provide: SchdLocation, useClass: SchdLocation} ],
 
            imports: [
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot()
            ]
 
        }).compileComponents();
 
    }));*/
 
    beforeEach(() => {

    	//backend = new BackEndService(new Http(), new Storage(), new AlertController() )
 
        /*fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;*/
 
    });
 
    /*afterEach(() => {
        fixture.destroy();
        comp = null;
    });*/
 
    it('JWT token is stored', () => {
 
        /*expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();*/
 
    });
 
});