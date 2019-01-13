import {Action} from '@ngrx/store';
import {ApplyFiltersParameters, ServerCollection} from '../../core/api/server/server-collection.class';

export enum ServerListActionTypes {
    LoadServers = '[ServerList] Load Servers',
    LoadServersSuccess = '[ServerList] Load Servers Success',
    LoadServersFailure = '[ServerList] Load Servers Failure',
    ApplyFilters = '[ServerList] Apply Filters'
}

export class LoadServersAction implements Action {
    readonly type = ServerListActionTypes.LoadServers;
}

export class LoadServersSuccessAction implements Action {
    readonly type = ServerListActionTypes.LoadServersSuccess;

    constructor(public payload: ServerCollection) {
    }
}

export class LoadServersFailureAction implements Action {
    readonly type = ServerListActionTypes.LoadServersFailure;

    constructor(public payload: { reason: string }) {
    }
}

export class ApplyFiltersAction implements Action {
    readonly type = ServerListActionTypes.ApplyFilters;

    constructor(public payload: ApplyFiltersParameters) {
    }
}

export type Union =
    LoadServersAction
    | LoadServersSuccessAction
    | LoadServersFailureAction
    | ApplyFiltersAction;
