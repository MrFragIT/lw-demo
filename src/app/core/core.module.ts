import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServersApiService} from './api/server/servers-api.service';
import {HttpClientModule} from '@angular/common/http';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [PageNotFoundComponent],
    providers: [ServersApiService],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ],
    exports: [
        PageNotFoundComponent
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
