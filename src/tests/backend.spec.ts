import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SchdStorageMock } from '../mocks';

import { BackEndService } from '../services/back-end-service';
import { SchdStorage } from '../services/schd-storage';
 
describe('Service: Backend', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [
 
            ],
 
            providers: [
                BackEndService,
                { 
                    provide: SchdStorage, 
                    useClass: SchdStorageMock
                },
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http, 
                    useFactory: (mockBackend, options) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ],
 
            imports: [
                HttpModule
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
 
    });
 
   it('can save and get jwt token', inject([BackEndService], (backendService) => {
        let tokenTest = 'abxdf';

        backendService.authSuccess(tokenTest);
        
        backendService.getSavedJwt().then(res => {
           expect(backendService.jwtToken == tokenTest).toBeTruthy();
        
        });
      
    }));

    it('can get backend token', inject([BackEndService, MockBackend], (backendService, mockBackend) => {
 
        let tokenTest = 'fghsdfh';
 
        mockBackend.connections.subscribe((connection) => {
 
            connection.mockRespond(new Response(new ResponseOptions({
                body: tokenTest
            })));
 
        });
  
        backendService.getBackEndToken().then(res => {
           expect(res == tokenTest).toBeTruthy();
           
        });
 
    }));
 
});