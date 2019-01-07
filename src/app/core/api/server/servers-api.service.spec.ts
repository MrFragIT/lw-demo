import {TestBed} from '@angular/core/testing';

import {ServersApiService} from './servers-api.service';

describe('ServersApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ServersApiService = TestBed.get(ServersApiService);
        expect(service).toBeTruthy();
    });
});
