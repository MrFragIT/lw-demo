import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Ng5SliderModule} from 'ng5-slider';
import {AmountCentsPipe} from './pipes/amountCents/amountCents.pipe';

const declareAndExport = [AmountCentsPipe];
const importAndExport = [FormsModule, Ng5SliderModule];

@NgModule({
    declarations: [...declareAndExport],
    imports: [
        CommonModule,
        ...importAndExport
    ],
    exports: [
        ...importAndExport,
        ...declareAndExport
    ]
})
export class SharedModule {
}
