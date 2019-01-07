import {Pipe, PipeTransform} from '@angular/core';

/**
 * Convert "amountCents" fields from integer to floats (then you should pass it to a currency pipe)
 */

@Pipe({
    name: 'amountCents'
})
export class AmountCentsPipe implements PipeTransform {

    transform(value: number, args?: any): number {
        if (Number.isInteger(value)) {
            return value / 100;
        }
        return value;
    }

}
