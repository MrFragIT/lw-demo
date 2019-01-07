import {AmountCentsPipe} from './amountCents.pipe';

describe('AmountCentsPipe', () => {
    it('create an instance', () => {
        const pipe = new AmountCentsPipe();
        expect(pipe).toBeTruthy();
    });
});
