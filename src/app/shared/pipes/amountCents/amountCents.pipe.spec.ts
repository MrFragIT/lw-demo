import {AmountCentsPipe} from './amountCents.pipe';

describe('AmountCentsPipe', () => {
    let pipe: AmountCentsPipe;

    beforeEach(() => {
        pipe = new AmountCentsPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should convert an integer number', () => {
        expect(pipe.transform(4999)).toEqual(49.99);
        expect(pipe.transform(99)).toEqual(0.99);
        expect(pipe.transform(-4999)).toEqual(-49.99);
        expect(pipe.transform(-99)).toEqual(-0.99);
    });

    it('should not convert a floating number', () => {
        expect(pipe.transform(49.99)).toEqual(49.99);
    });
});
