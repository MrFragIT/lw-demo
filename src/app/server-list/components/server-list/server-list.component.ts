import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ServerListState} from '../../store/server-list.state';
import {LoadServersAction} from '../../store/server-list.action';

@Component({
    selector: 'app-server-list',
    templateUrl: './server-list.component.html',
    styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements OnInit {
    state$: Observable<ServerListState>;

    constructor(
        private store: Store<ServerListState>
    ) {
    }

    ngOnInit() {
        this.state$ = this.store.select(state => state['serverList']);

        // Load allServers
        this.store.dispatch(new LoadServersAction());
    }
}
