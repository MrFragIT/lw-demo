import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Ng5SliderModule} from 'ng5-slider';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        Ng5SliderModule
    ],
    exports: [
        FormsModule,
        Ng5SliderModule
    ]
})
export class SharedModule {
}
