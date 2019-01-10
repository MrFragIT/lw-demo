import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FiltersOptions, ServerListState} from '../../store/server-list.state';

import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {filter, take} from 'rxjs/operators';
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
            ram: this.fb.array([]),
            hdd: [null],
            location: [null],
        });

        this.filtersForm.valueChanges.subscribe((val: ApplyFiltersParameters) => {
            console.log(val);

            // Format RAM filters values to be usable (from true/false to selected sizes)
            val.ram = val.ram.reduce((acc, checked, idx) => {
                if (checked) {
                    acc.push(this.options.ram[idx]);
                }
                return acc;
            }, []);
            if (val.ram.length === 0) {
                val.ram = null; // I must convert it to NULL or I will filter out everything!
            }

            this.store.dispatch(new ApplyFilters(val));
        });

        this.store
            .select(state => state['serverList'])
            .pipe(
                filter((state: ServerListState) => !!state.filtersOptions),
                take(1)
            )
            .subscribe((state: ServerListState) => {
                console.log(state);
                this.options = state.filtersOptions;

                // Add ram controls to filtersForm.ram FormArray
                const fa = this.filtersForm.get('ram') as FormArray;
                state.filtersOptions.ram.forEach((v: number) => {
                    fa.push(this.fb.control(false));
                });

                this.ready = true;
            });
    }
}
