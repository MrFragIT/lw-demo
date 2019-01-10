import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServerListComponent} from './components/server-list/server-list.component';
import {ServerComponent} from './components/server/server.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {ServerListReducer} from './store/server-list.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ServerListEffects} from './store/server-list.effects';
import {ServerFiltersComponent} from './components/server-filters/server-filters.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ServerListComponent,
    }
];

@NgModule({
    declarations: [
        ServerListComponent,
        ServerComponent,
        ServerFiltersComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('serverList', ServerListReducer),
        EffectsModule.forFeature([ServerListEffects]),
        RouterModule.forChild(routes)
    ],
})
export class ServerListModule {
}
