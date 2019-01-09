import {ServerApiInterface} from './servers-api.interface';
import {memorySizeToGB} from '../../memory-size-to-gb.enum';

export class Server {
    readonly model: string;
    readonly ram: {
        memory: number;
        unit: string;
        type: string;
    };
    readonly hdd: {
        memory: number;
        count: number;
        unit: string;
        type: string;
    };
    readonly location: string;
    readonly price: {
        currency: string;
        currencySymbol: string;
        amountCents: number;
    };

    constructor(apiResponse: ServerApiInterface) {
        this.model = apiResponse.model;
        this.ram = {
            memory: +apiResponse.ram.memory,
            unit: apiResponse.ram.unit,
            type: apiResponse.ram.type
        };
        this.hdd = {
            memory: +apiResponse.hdd.memory,
            count: +apiResponse.hdd.count,
            unit: apiResponse.hdd.unit,
            type: apiResponse.hdd.type
        };
        this.location = apiResponse.location;
        this.price = {
            currency: apiResponse.price.currency,
            currencySymbol: apiResponse.price.currencySymbol,
            amountCents: +apiResponse.price.amountCents
        };
    }

    /**
     * Return the total amount of GB of storage available.
     */
    getTotalStorageGB(): number {
        // Check if multiplier is available
        if (!memorySizeToGB[this.hdd.unit]) {
            throw new Error(`Unknown HDD unit ${this.hdd.unit}`);
        }

        return this.hdd.memory * memorySizeToGB[this.hdd.unit] * this.hdd.count;
    }
}
