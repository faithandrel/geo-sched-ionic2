import { TestBed, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../app/app.component';
import { LogInPage } from '../pages/log-in/log-in';
import { BackEndService } from '../services/back-end-service';
import { SchdErrorHandler } from '../services/schd-error-handler';
import { SchdLocation } from '../services/schd-location';
import { IonicStorageModule } from '@ionic/storage';
var comp;
var fixture;
describe('Component: Root Component', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            providers: [{ provide: BackEndService, useClass: BackEndService },
                { provide: SchdErrorHandler, useClass: SchdErrorHandler },
                { provide: SchdLocation, useClass: SchdLocation }],
            imports: [
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot()
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MyApp);
        comp = fixture.componentInstance;
    });
    afterEach(function () {
        fixture.destroy();
        comp = null;
    });
    it('is created', function () {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    it('initialises with a root page of LogInPage', function () {
        expect(comp['rootPage']).toBe(LogInPage);
    });
});
//# sourceMappingURL=app.spec.js.map