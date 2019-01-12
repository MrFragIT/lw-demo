import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-error-box',
    template: `
        <div class="container-center text-center">
            <div class="big-icon"><img src="/assets/sad.svg" alt=""></div>
            <br>
            <span class="lead">{{message}}</span>
        </div>`,
})
export class ErrorBoxComponent {
    @Input() message: string;
}
