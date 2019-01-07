import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServerListComponent} from './server-list/server-list.component';
import {StorageFilterComponent} from './storage-filter/storage-filter.component';
import {RamFilterComponent} from './ram-filter/ram-filter.component';
import {HddFilterComponent} from './hdd-filter/hdd-filter.component';
import {LocationFilterComponent} from './location-filter/location-filter.component';
import {ServerComponent} from './server/server.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [ServerListComponent, StorageFilterComponent, RamFilterComponent, HddFilterComponent, LocationFilterComponent, ServerComponent],
    imports: [
        CommonModule,
        SharedModule
    ],
    // TODO: Remove this export and implement lazy loading!
    exports: [
        ServerListComponent
    ]
})
export class ServerListModule {
}
