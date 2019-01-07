import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServersApiService} from './api/server/servers-api.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [],
    providers: [ServersApiService],
    imports: [
        CommonModule,
        HttpClientModule
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
