import {Component, OnInit} from '@angular/core';
import {ServersApiService} from '../../core/api/server/servers-api.service';
import {Observable} from 'rxjs';
import {Server} from '../../core/api/server/server.class';

@Component({
    selector: 'app-server-list',
    templateUrl: './server-list.component.html',
    styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements OnInit {
    list$: Observable<Server[]>;

    constructor(
        private readonly serversApi: ServersApiService
    ) {
    }

    ngOnInit() {
        this.list$ = this.serversApi.getServers();
    }
}
