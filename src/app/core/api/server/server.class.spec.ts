/* tslint:disable */
import {GetServerApiResponseInterface, ServerApiInterface} from './servers-api.interface';
import {Server} from './server.class';

const validData4TB: GetServerApiResponseInterface = JSON.parse(`{"servers":[{"model":"Dell R210Intel Xeon X3440","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"AmsterdamAMS-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":4999}}]}`);
const validData500GB: GetServerApiResponseInterface = JSON.parse(`{"servers":[{"model":"Dell R210Intel Xeon X3440","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"500","count":"1","unit":"GB","type":"SATA2"},"location":"AmsterdamAMS-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":4999}}]}`);
const invalidData: GetServerApiResponseInterface = JSON.parse(`{"servers":[{"model":"Dell R210Intel Xeon X3440","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"XX","type":"SATA2"},"location":"AmsterdamAMS-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":4999}}]}`);

describe('ServerClass', () => {
    // Check that every attribute is as expected
    it('should properly convert inputs', () => {
        const validInput: ServerApiInterface = validData4TB.servers[0];
        const testClass = new Server(validInput);

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

    it ('should convert TB to GB', () => {
        const validInput: ServerApiInterface = validData4TB.servers[0];
        const testClass = new Server(validInput);

        expect(testClass.getTotalStorageGB()).toBe(4096);
    });

    it ('should not convert GB', () => {
        const validInput: ServerApiInterface = validData500GB.servers[0];
        const testClass = new Server(validInput);

        expect(testClass.getTotalStorageGB()).toBe(500);
    });

    it ('should raise an exception if storage size is unknown', () => {
        const validInput: ServerApiInterface = invalidData.servers[0];
        const testClass = new Server(validInput);

        expect(() => testClass.getTotalStorageGB()).toThrow(new Error("Unknown HDD unit XX"));
    });
});
