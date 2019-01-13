import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FiltersOptions, ServerListState} from '../../store/server-list.state';
import {CustomStepDefinition, Options} from 'ng5-slider';
import {FormBuilder, FormGroup} from '@angular/forms';
import {filter, take} from 'rxjs/operators';
import {ApplyFiltersAction} from '../../store/server-list.action';
import {ApplyFiltersParameters} from '../../../core/api/server/server-collection.class';

/**
 * Allowed steps for storage slider
 */
const stepsArray: CustomStepDefinition[] = [
    {value: 0, legend: '0'},
    {value: 250, legend: '250GB'},
    {value: 500, legend: '500GB'},
    {value: 1024, legend: '1TB'},
    {value: 2048, legend: '2TB'},
    {value: 3072, legend: '3TB'},
    {value: 4096, legend: '4TB'},
    {value: 8192, legend: '8TB'},
    {value: 12288, legend: '12TB'},
    {value: 24576, legend: '24TB'},
    {value: 49152, legend: '48TB'},
    {value: 73728, legend: '72TB'},
];

@Component({
    selector: 'app-server-filters',
    templateUrl: './server-filters.component.html',
    styleUrls: ['./server-filters.component.scss']
})
export class ServerFiltersComponent implements OnInit {
    ready = false;
    filtersForm: FormGroup;
    filtersOptions: FiltersOptions;
    sliderOptions: Options = {
        stepsArray,
        floor: 0,
        ceil: 73728,
        translate: (gb: number) => stepsArray.find((def) => def.value === gb).legend
    };

    constructor(
        private store: Store<ServerListState>,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        /**
         * Subscribe to state, when filterOptions are available, initialize filters. This is done only once.
         */
        this.store
            .select(state => state['serverList'])
            .pipe(
                filter((state: ServerListState) => !!state.filtersOptions),
                take(1)
            )
            .subscribe((state: ServerListState) => {
                this.filtersOptions = state.filtersOptions;
                this.initFilters();
            });
    }

    private initFilters() {
        /**
         * Adapt sliderOptions with new limits
         */
        const min = this.filtersOptions.storage[0];
        const max = this.filtersOptions.storage[1];
        this.sliderOptions.stepsArray = this.sliderOptions.stepsArray.filter(
            (step, i) => {
                return (step.value <= max) && (
                    step.value >= min ||
                    this.sliderOptions.stepsArray[i + 1] === undefined ||
                    this.sliderOptions.stepsArray[i + 1].value > min
                );
            });
        this.sliderOptions.floor = this.filtersOptions.storage[0];
        this.sliderOptions.ceil = this.filtersOptions.storage[1];

        /**
         * Initialize form group with default values
         */
        this.filtersForm = this.fb.group({
            storage: [this.filtersOptions.storage],
            ram: this.fb.array(this.filtersOptions.ram.map(() => this.fb.control(false))),
            hdd: [null],
            location: [null],
        });

        /**
         * Subscribe to filtersForm changes. Apply some data transforms and dispatch an ApplyFiltersAction action.
         */
        this.filtersForm.valueChanges.subscribe((val: ApplyFiltersParameters) => {
            // Format storage filters
            val.storage = {min: val.storage[0], max: val.storage[1]};

            // Format RAM filters values to be usable (convert from true/false to selected sizes)
            val.ram = val.ram.reduce((acc, checked, idx) => {
                if (checked) {
                    acc.push(this.filtersOptions.ram[idx]);
                }
                return acc;
            }, []);
            if (val.ram.length === 0) {
                val.ram = null; // I must convert it to NULL or I will filter out everything!
            }

            this.store.dispatch(new ApplyFiltersAction(val));
        });

        /**
         * Setting ready state will make filters appear
         */
        this.ready = true;
    }
}
