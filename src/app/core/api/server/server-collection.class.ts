import {Server} from './server.class';

export class ServerCollection {
    constructor(servers: Server[]) {
        this._servers = servers;
    }

    private _servers: Server[];

    get servers(): Server[] {
        return this._servers;
    }

    filterByStorage(minGB: number, maxGB: number): ServerCollection {
        this._servers = this._servers.filter(s => {
            const totalStorage = s.getTotalStorageGB();
            return (minGB >= totalStorage) && (maxGB <= totalStorage);
        });
        return this;
    }

    filterByRAM(memory: number): ServerCollection {
        this._servers = this._servers.filter(s => s.ram.memory === memory);
        return this;
    }

    filterByHDD(type: string): ServerCollection {
        this._servers = this._servers.filter(s => s.hdd.type === type);
        return this;
    }

    filterByLocation(location: string): ServerCollection {
        this._servers = this._servers.filter(s => s.location === location);
        return this;
    }
}
