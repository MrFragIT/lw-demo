import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class CoreModule {

    /**
     * Prevent re-import oif the core module
     */
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded!!!`);
        }
    }
}
