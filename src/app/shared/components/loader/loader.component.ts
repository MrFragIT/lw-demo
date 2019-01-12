import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-loader',
    template: `
        <div class="loader" id="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>`,
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
