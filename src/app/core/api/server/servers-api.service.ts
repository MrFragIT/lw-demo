import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetServerApiResponseInterface, ServerApiInterface} from './servers-api.interface';
import {Server} from './server.class';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ApiService} from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class ServersApiService extends ApiService {
    constructor(
        private readonly http: HttpClient
    ) {
        super();
    }

    getServers(): Observable<Server[]> {
        return this.http.get<GetServerApiResponseInterface>(this.getEndpoint('servers')).pipe(
            map(({servers}) => servers.map((s: ServerApiInterface) => new Server(s)))
        );
    }
}
