import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../app/app.component';
import { LogInPage } from '../pages/log-in/log-in';

import {BackEndService} from '../services/back-end-service';
import {SchdErrorHandler} from '../services/schd-error-handler';
import {SchdLocation} from '../services/schd-location';
import {IonicStorageModule} from '@ionic/storage';
 
let comp: MyApp;
let fixture: ComponentFixture<MyApp>;
 
describe('Component: Root Component', () => {
 
    beforeEach(async(() => {
 
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
 
    }));
 
    beforeEach(() => {
 
        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;
 
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
    });
 
    it('is created', () => {
 
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
 
    });
 
    it('initialises with a root page of LogInPage', () => {
        expect(comp['rootPage']).toBe(LogInPage);
    });
 
});