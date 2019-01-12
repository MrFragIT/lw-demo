import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetServerApiResponseInterface, ServerApiInterface} from './servers-api.interface';
import {Server} from './server.class';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {ServerCollection} from './server-collection.class';

@Injectable({
    providedIn: 'root'
})
export class ServersApiService extends ApiService {
    constructor(
        private readonly http: HttpClient
    ) {
        super();
    }

    /**
     * Fetch server from remote API, returns ServerCollection instance
     */
    getServers(): Observable<ServerCollection> {
        return this.http.get<GetServerApiResponseInterface>(this.getEndpoint('servers')).pipe(
            map(({servers}) => {
                if (servers.length === 0) {
                    throw new Error(`No results from server.`);
                }
                return new ServerCollection(servers.map((s: ServerApiInterface) => new Server(s)));
            })
        );
    }
}
