import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';

@Component({
    selector: 'app-storage-filter',
    templateUrl: './storage-filter.component.html',
    styleUrls: ['./storage-filter.component.scss']
})
export class StorageFilterComponent implements OnInit {
    minValue = 20;
    maxValue = 80;
    options: Options = {
        floor: 0,
        ceil: 100,
        step: 5
    };

    constructor() {
    }

    ngOnInit() {
    }

}
