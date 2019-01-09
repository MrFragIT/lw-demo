import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FiltersOptions, ServerListState} from '../../store/server-list.state';

import {FormBuilder, FormGroup} from '@angular/forms';
import {filter} from 'rxjs/operators';
import {ApplyFilters} from '../../store/server-list.action';
import {ApplyFiltersParameters} from '../../../core/api/server/server-collection.class';

@Component({
    selector: 'app-server-filters',
    templateUrl: './server-filters.component.html',
    styleUrls: ['./server-filters.component.scss']
})
export class ServerFiltersComponent implements OnInit {
    ready = false;
    filtersForm: FormGroup;
    options: FiltersOptions;

    constructor(
        private store: Store<ServerListState>,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.filtersForm = this.fb.group({
            location: [null],
            hdd: [null]
        });

        this.filtersForm.valueChanges.subscribe((val: ApplyFiltersParameters) => {
            console.log(val);
            this.store.dispatch(new ApplyFilters(val));
        });

        this.store
            .select(state => state['serverList'])
            .pipe(
                filter((state: ServerListState) => !!state.filtersOptions)
            )
            .subscribe((state: ServerListState) => {
                console.log(state);

                this.options = state.filtersOptions;
                this.ready = true;
            });
    }
}
