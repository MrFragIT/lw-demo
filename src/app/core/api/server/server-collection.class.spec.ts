/* tslint:disable */
import {GetServerApiResponseInterface} from './servers-api.interface';
import {ServerCollection} from './server-collection.class';
import {Server} from './server.class';

const validData: GetServerApiResponseInterface = JSON.parse(`{"servers":[
    {"model":"Test1","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"512","unit":"GB","type":"SSD"},"location":"LOC-03","price":{"currency":"EUR","currencySymbol":"€","amountCents":1000}},
    {"model":"Test2","ram":{"memory":"32","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"1","unit":"TB","type":"SATA2"},"location":"LOC-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":2000}},
    {"model":"Test3","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"LOC-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":3000}},
    {"model":"Test4","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"1","unit":"TB","type":"SSD"},"location":"LOC-02","price":{"currency":"EUR","currencySymbol":"€","amountCents":4000}},
    {"model":"Test5","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"2","unit":"TB","type":"SSD"},"location":"LOC-03","price":{"currency":"EUR","currencySymbol":"€","amountCents":5000}}
]}`);

describe('ServerCollectionClass', () => {
    let collection: ServerCollection;

    beforeEach(() => {
        const servers = validData.servers.map(data => new Server(data));
        collection = new ServerCollection(servers);
    });

    afterEach(() => {
        collection.reset();
    });

    it('Should have instantiated a ServerCollection with the correct number of servers', () => {
        expect(collection).toEqual(jasmine.any(ServerCollection));
        expect(collection.length).toEqual(5);
        expect(collection.servers.length).toEqual(5);
    });

    it('Should extract storage filter options', () => {
        const opts = collection.getStorageFilterLimits();
        expect(opts).toEqual([512, 4096]);
    });

    it('Should extract RAM filter options', () => {
        const opts = collection.getRAMFilterOptions();
        expect(opts).toEqual([16, 32]);
    });

    it('Should extract HDD filter options', () => {
        const opts = collection.getHDDFilterOptions();
        expect(opts).toEqual(['SATA2', 'SSD']);
    });

    it('Should extract Location filter options', () => {
        const opts = collection.getLocationFilterOptions();
        expect(opts).toEqual(['LOC-01', 'LOC-02', 'LOC-03']);
    });

    it('Should filter by storage', () => {
        collection.applyStorageFilter(1024, 2048);
        expect(collection.length).toEqual(3);
        expect(collection.servers[0].model).toBe('Test2');
        expect(collection.servers[1].model).toBe('Test4');
        expect(collection.servers[2].model).toBe('Test5');
    });

    it('Should filter by RAM', () => {
        collection.applyRamFilter([32]);
        expect(collection.length).toEqual(1);
        expect(collection.servers[0].model).toBe('Test2');
    });

    it('Should filter by HDD', () => {
        collection.applyHddFilter('SATA2');
        expect(collection.length).toEqual(2);
        expect(collection.servers[0].model).toBe('Test2');
        expect(collection.servers[1].model).toBe('Test3');
    });

    it('Should filter by location', () => {
        collection.applyHddFilter('Loc-02');
        expect(collection.length).toEqual(1);
        expect(collection.servers[0].model).toBe('Test4');
    });
});
