import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServerListComponent} from './components/server-list/server-list.component';
import {StorageFilterComponent} from './components/storage-filter/storage-filter.component';
import {RamFilterComponent} from './components/ram-filter/ram-filter.component';
import {HddFilterComponent} from './components/hdd-filter/hdd-filter.component';
import {LocationFilterComponent} from './components/location-filter/location-filter.component';
import {ServerComponent} from './components/server/server.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {ServerListReducer} from './store/server-list.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ServerListEffects} from './store/server-list.effects';

@NgModule({
    declarations: [
        ServerListComponent,
        StorageFilterComponent,
        RamFilterComponent,
        HddFilterComponent,
        LocationFilterComponent,
        ServerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('serverList', ServerListReducer),
        EffectsModule.forFeature([ServerListEffects])
    ],
    // TODO: Remove this export and implement lazy loading!
    exports: [
        ServerListComponent
    ]
})
export class ServerListModule {
}
