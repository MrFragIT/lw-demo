/* tslint:disable:max-line-length */
import {TestBed} from '@angular/core/testing';
import {ServersApiService} from './servers-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {GetServerApiResponseInterface} from './servers-api.interface';
import {ServerCollection} from './server-collection.class';

/**
 * Mocked data expected from server
 */
const validUrl = 'http://assignment.ut3.nl:4300/api/servers';
const validData: GetServerApiResponseInterface = JSON.parse(`{"servers":[{"model":"Dell R210Intel Xeon X3440","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"AmsterdamAMS-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":4999}}]}`);


describe('ServersApiService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: ServersApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(ServersApiService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch valid data and return a ServerCollection', () => {
        service.getServers().subscribe(out => {
            expect(out).toEqual(jasmine.any(ServerCollection));
            expect(out.length).toBe(1);
        });

        // Assert that a GET call to validUrl is made
        const getServersReq = httpTestingController.expectOne(validUrl);
        expect(getServersReq.request.method).toEqual('GET');

        // Send mocked valid data
        getServersReq.flush(validData);
    });

    it('should fetch an empty dataset and return an empty ServerCollection', () => {
        service.getServers().subscribe(out => {
            expect(out).toEqual(jasmine.any(ServerCollection));
            expect(out.servers).toBe([]);
            expect(out.length).toBe(0);
        });

        // Assert that a GET call to validUrl is made
        const getServersReq = httpTestingController.expectOne(validUrl);
        expect(getServersReq.request.method).toEqual('GET');

        // Send empty response
        getServersReq.flush([]);
    });
});
