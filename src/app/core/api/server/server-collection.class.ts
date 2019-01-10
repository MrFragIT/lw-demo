import {Server} from './server.class';

export interface ApplyFiltersParameters {
    storage?: {
        min: number;
        max: number;
    };
    ram?: number[];
    hdd?: string;
    location?: string;
}

/**
 * This class holds a collection of Server objects.
 * It also offer the ability to perform operations such as filtering.
 *
 * Filters can be reverted by calling reset()
 */
export class ServerCollection {
    private readonly _initServers: Server[];  // Backup of the initial state of the collection
    private _servers: Server[];               // Public available collection of servers, can be reduced by filters

    constructor(servers: Server[] = []) {
        this._initServers = servers;
        this._servers = servers;
    }

    get servers(): Server[] {
        return this._servers;
    }

    get length(): number {
        return this._servers.length;
    }

    /**
     * Restore the initial state of the collection
     * this is returned to allow chaining
     */
    reset(): ServerCollection {
        this._servers = this._initServers;
        return this;
    }

    /**
     *  Helper function to apply many filters in a single call
     */
    applyFilters(params: ApplyFiltersParameters) {
        if (params.storage) {
            this.applyStorageFilter(params.storage.min, params.storage.max);
        }
        if (params.hdd) {
            this.applyHddFilter(params.hdd);
        }
        if (params.location) {
            this.applyLocationFilter(params.location);
        }
        if (params.ram) {
            this.applyRamFilter(params.ram);
        }
    }

    /**
     * Extracts all possible storage filter filtersOptions from the dataset, sorted ASC
     * Remember, storage is expressd in GB!
     */
    getStorageFilterOptions(): number[] {
        return this._servers.reduce((acc: number[], srv: Server) => {
            const v = srv.getTotalStorageGB();
            if (!acc.includes(v)) {
                acc.push(v);
            }
            return acc;
        }, []).sort((a, b) => a - b);
    }

    /**
     * Filters the collection by quantity of storage (min & max must be expressed in GB)
     */
    applyStorageFilter(min: number, max: number) {
        this._servers = this._servers.filter(s => {
            const totalStorage = s.getTotalStorageGB();
            return (totalStorage >= min) && (totalStorage <= max);
        });
    }

    /**
     * Extracts all possible RAM filter filtersOptions from the dataset, sorted ASC
     */
    getRAMFilterOptions(): number[] {
        return this._servers.reduce((acc: number[], s: Server) => {
            const v = s.ram.memory;
            if (!acc.includes(v)) {
                acc.push(v);
            }
            return acc;
        }, []).sort((a, b) => a - b);
    }

    /**
     * Filters the collection by memory
     */
    applyRamFilter(memory: number[]) {
        this._servers = this._servers.filter(s => memory.includes(s.ram.memory));
    }

    /**
     * Extracts all possible HDD type filter filtersOptions from the dataset, sorted ASC
     */
    getHDDFilterOptions(): string[] {
        return this._servers.reduce((acc: string[], s: Server) => {
            const v = s.hdd.type;
            if (!acc.includes(v)) {
                acc.push(v);
            }
            return acc;
        }, []).sort();
    }

    /**
     * Filters the collection by HDD type
     */
    applyHddFilter(type: string) {
        this._servers = this._servers.filter(s => s.hdd.type === type);
    }

    /**
     * Extracts all possible LOCATION filter filtersOptions from the dataset, sorted ASC
     */
    getLocationFilterOptions(): string[] {
        return this._servers.reduce((acc: string[], s: Server) => {
            const v = s.location;
            if (!acc.includes(v)) {
                acc.push(v);
            }
            return acc;
        }, []).sort();
    }

    /**
     * Filters the collection by location
     */
    applyLocationFilter(location: string) {
        this._servers = this._servers.filter(s => s.location === location);
    }
}
