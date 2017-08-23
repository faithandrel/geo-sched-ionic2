import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SchdStorageMock } from '../mocks';
import { BackEndService } from '../services/back-end-service';
import { SchdStorage } from '../services/schd-storage';
describe('Service: Backend', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [],
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
                    useFactory: function (mockBackend, options) {
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
    /*beforeEach(() => {
         jasmine.clock().install();
    });

    afterEach(() => {
         jasmine.clock().uninstall();
    });*/
    fit('can save and get jwt token', fakeAsync(inject([BackEndService], function (backendService) {
        var tokenTest = 'abxdf';
        backendService.authSuccess(tokenTest);
        backendService.getSavedJwt();
        tick(1000);
        //setTimeout(function() {
        console.log(backendService.jwtToken);
        //}, 100);
    })));
    it('should set foo with a 1s delay', fakeAsync(inject([BackEndService], function (backendService) {
        var tokenTest = 'abxdf';
        backendService.authSuccess(tokenTest);
        backendService.getSavedJwt();
        tick(1000);
        //setTimeout(function() {
        console.log(backendService.jwtToken);
        //}, 100);
    })));
    it('can get backend token', inject([BackEndService, MockBackend], function (backendService, mockBackend) {
        var lastConnection = null;
        var tokenTest = "$2y$10$j7ynzsvnvGWxCuapBOLnQkQVu8dvTZAL6q";
        var mockResponse = '{"token": "' + tokenTest + '" }';
        mockBackend.connections.subscribe(function (connection) {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
            lastConnection = connection;
        });
        backendService.getBackEndToken().then(function (res) {
            expect(backendService.backEndToken).toBe(tokenTest);
            expect(lastConnection.request.url).toBe(backendService.backEndUrl + 'test-token');
            expect(lastConnection.request.method).toBe(RequestMethod.Get);
        });
    }));
    it('can get item list', inject([BackEndService, MockBackend, Http], function (backendService, mockBackend, http) {
        var lastConnection = null;
        mockBackend.connections.subscribe(function (connection) {
            connection.mockRespond(new Response(new ResponseOptions({
                body: require('./files/items.json')
            })));
            lastConnection = connection;
        });
        //mockBackend.connections.subscribe((connection: any) => lastConnection = connection);
        var result = backendService.getItems().then(function (res) {
            expect(res.length).toEqual(2);
            expect(lastConnection.request.url).toEqual(backendService.backEndUrl + 'test-token');
            expect(lastConnection.request.method == RequestMethod.Post).toBeTruthy();
            console.log(lastConnection.request.method);
            console.log(RequestMethod.Post);
            console.log(lastConnection.request.method == RequestMethod.Post);
        });
    }));
});
//# sourceMappingURL=backend.spec.js.map