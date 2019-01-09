import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ServerListState} from '../../store/server-list.state';
import {map} from 'rxjs/operators';
import {FilterByHdd} from '../../store/server-list.action';

@Component({
    selector: 'app-sl-hdd-filter',
    templateUrl: './hdd-filter.component.html',
    styleUrls: ['./hdd-filter.component.scss']
})
export class HddFilterComponent implements OnInit {
    state$: Observable<{ options: string[], selected: string }>;

    constructor(
        private store: Store<ServerListState>
    ) {
    }

    ngOnInit() {
        this.state$ = this.store.select(state => state['serverList']).pipe(
            map((state: ServerListState) => {
                let options = null;
                let selected = null;

                if (state.filtersOptions) {
                    options = state.filtersOptions.hdd || null;
                }

                if (state.filtersValues) {
                    selected = state.filtersValues.hdd || null;
                }

                return {options, selected};
            })
        );
    }

    applyFilter(loc: string) {
        if (loc === '') {
            loc = null;
        }
        this.store.dispatch(new FilterByHdd({type: loc}));
    }
}
