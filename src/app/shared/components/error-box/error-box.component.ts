import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-error-box',
    template: `
        <div class="container-center text-center">
            <div class="icon"><img src="assets/storm.svg" alt=""></div>
            <br>
            <span class="lead">{{message}}</span>
        </div>`,
    styleUrls: ['./error-box.component.scss']
})
export class ErrorBoxComponent {
    @Input() message: string;
}
