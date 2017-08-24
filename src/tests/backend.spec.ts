import { TestBed, inject, async, fakeAsync } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
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

   it('can save and get jwt token', fakeAsync(
        inject([BackEndService], (backendService) => {
            let tokenTest = 'abxdf';

            backendService.authSuccess(tokenTest);
            
            backendService.getSavedJwt().then(res => {
               expect(backendService.jwtToken == tokenTest).toBeTruthy();
        
            });
        })
    ));

    it('can get backend token', fakeAsync(
        inject([BackEndService, MockBackend], (backendService, mockBackend) => {
         
            let lastConnection = null;
            let tokenTest = "$2y$10$j7ynzsvnvGWxCuapBOLnQkQVu8dvTZAL6q";

            const mockResponse = '{"token": "' + tokenTest + '" }';
     
     
            mockBackend.connections.subscribe((connection) => {
     
                connection.mockRespond(new Response(new ResponseOptions({
                    body: mockResponse
                })));

                lastConnection = connection;
            });
      
            backendService.getBackEndToken().then(res => {
               expect(backendService.backEndToken).toBe(tokenTest);
               expect(lastConnection.request.url).toBe(backendService.backEndUrl+'test-token');
               expect(lastConnection.request.method).toBe(RequestMethod.Get);
            });
     
        })
    ));

    it('can get item list', fakeAsync( 
        inject([BackEndService, MockBackend, Http], 
                                    (backendService, mockBackend, http) => {

            let lastConnection = null;

            mockBackend.connections.subscribe((connection) => {
     
                connection.mockRespond(new Response(new ResponseOptions({
                    body: require('./files/items.json')
                })));

                lastConnection = connection;
     
            });
            backendService.getSavedJwt().then(res => {
                 return backendService.getItems();             
            })
            .then(
               (res) => {
                   expect(res.length).toEqual(2);
                   expect(lastConnection.request.url).toBe(backendService.backEndUrl+'get-items');
                   expect(lastConnection.request.method).toBe(RequestMethod.Get);
                   expect(lastConnection.request.headers.get('Authorization'))
                           .toBe('Bearer xyzabc');
            });
            
        })
    ));

    it('can save new item', fakeAsync( 
        inject([BackEndService, MockBackend, Http], 
                                    (backendService, mockBackend, http) => {

            let lastConnection = null;
            let testItem = {
                title: 'Test',
                content: 'This is a test.'
            }
            mockBackend.connections.subscribe((connection) => {
     
                connection.mockRespond(new Response(new ResponseOptions({
                    body: '{"test": "test"}'
                })));

                lastConnection = connection;
     
            });

            backendService.getSavedJwt().then(res => {
                 backendService.saveItem(testItem)               
            })
            .then((res) => {
                   expect(lastConnection.request.url).toBe(backendService.backEndUrl+'save-item');
                   expect(lastConnection.request.method).toBe(RequestMethod.Post);
                   expect(lastConnection.request.getBody()).toBe(JSON.stringify(testItem));
                   expect(lastConnection.request.headers.get('Authorization'))
                           .toBe('Bearer xyzabc');
            });
            
        })
    ));

    it('can log in with facebook', fakeAsync( 
        inject([BackEndService, MockBackend, Http], 
                                    (backendService, mockBackend, http) => {

            let lastConnection = null;
            let testFbUser = {
                username: 'test',
                facebook: '12345'
            }
            let tokenTest = 'abxdf';

            mockBackend.connections.subscribe((connection) => {
     
                connection.mockRespond(new Response(new ResponseOptions({
                    body: '{"token": "'+tokenTest+'"}'
                })));

                lastConnection = connection;
     
            });

            backendService.loginWithFacebook(testFbUser).then((res) => {
                   expect(res).toBeTruthy();
                   expect(lastConnection.request.url).toBe(backendService.backEndUrl+'facebook-log-in');
                   expect(lastConnection.request.method).toBe(RequestMethod.Post);
                   //TODO: add check for request body
                   expect(backendService.jwtToken).toBe(tokenTest);
            });
            
        })
    ));
    
    it('can log in with password', fakeAsync( 
        inject([BackEndService, MockBackend, Http], 
                                    (backendService, mockBackend, http) => {

            let lastConnection = null;
            let testUser = {
                username: 'test',
                facebook: '12345'
            }
            let tokenTest = 'abxdf';

            mockBackend.connections.subscribe((connection) => {
     
                connection.mockRespond(new Response(new ResponseOptions({
                    body: '{"token": "'+tokenTest+'"}'
                })));

                lastConnection = connection;
     
            });

            backendService.loginWithPassword(testUser).then((res) => {
                   expect(res).toBeTruthy();
                   expect(lastConnection.request.url).toBe(backendService.backEndUrl+'password-log-in');
                   expect(lastConnection.request.method).toBe(RequestMethod.Post);
                   //expect(lastConnection.request.getBody()).toBe(JSON.stringify(testItem));
                   expect(backendService.jwtToken).toBe(tokenTest);
            });
            
        })
    ));
});