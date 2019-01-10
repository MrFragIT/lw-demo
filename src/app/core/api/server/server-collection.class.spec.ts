/* tslint:disable */
import {GetServerApiResponseInterface} from './servers-api.interface';
import {ServerCollection} from './server-collection.class';
import {Server} from './server.class';

const validData: GetServerApiResponseInterface = JSON.parse(`{"servers":[{"model":"Dell R210Intel Xeon X3440","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"AmsterdamAMS-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":4999}}]}`);

describe('ServerCollectionClass', () => {
    let collection: ServerCollection;

    beforeEach(() => {
        const servers = validData.servers.map(data => new Server(data));
        collection = new ServerCollection(servers);
    });

    it('Should have instantiated a ServerCollection with the correct amount of servers', () => {
        expect(collection).toEqual(jasmine.any(ServerCollection));
        expect(collection.length).toEqual(1);
        expect(collection.servers.length).toEqual(1);
    });
});
