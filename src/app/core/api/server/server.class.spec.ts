/* tslint:disable */
import {GetServerApiResponseInterface, ServerApiInterface} from './servers-api.interface';
import {Server} from './server.class';

const validData: GetServerApiResponseInterface = JSON.parse(`{"servers":[{"model":"Dell R210Intel Xeon X3440","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"AmsterdamAMS-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":4999}}]}`);

describe('ServerClass', () => {
    it('should properly convert inputs', () => {
        const validInput: ServerApiInterface = validData.servers[0];
        const testClass = new Server(validInput);

        // Check that every attribute is as expected
        expect(testClass.model).toEqual('Dell R210Intel Xeon X3440');
        expect(testClass.location).toEqual('AmsterdamAMS-01');
        expect(testClass.ram.memory).toEqual(16);
        expect(testClass.ram.unit).toEqual('GB');
        expect(testClass.ram.type).toEqual('DDR3');
        expect(testClass.hdd.memory).toEqual(2);
        expect(testClass.hdd.count).toEqual(2);
        expect(testClass.hdd.unit).toEqual('TB');
        expect(testClass.hdd.type).toEqual('SATA2');
        expect(testClass.price.currency).toEqual('EUR');
        expect(testClass.price.currencySymbol).toEqual('€');
        expect(testClass.price.amountCents).toEqual(4999);
    });
});
