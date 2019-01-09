import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ServerListState} from '../../store/server-list.state';
import {Observable} from 'rxjs';
import {FilterByLocation} from '../../store/server-list.action';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-sl-location-filter',
    templateUrl: './location-filter.component.html',
    styleUrls: ['./location-filter.component.scss']
})
export class LocationFilterComponent implements OnInit {
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
                    options = state.filtersOptions.location || null;
                }

                if (state.filtersValues) {
                    selected = state.filtersValues.location || null;
                }

                return {options, selected};
            })
        );
    }

    applyFilter(loc: string) {
        if (loc === '') {
            loc = null;
        }
        this.store.dispatch(new FilterByLocation({location: loc}));
    }
}



