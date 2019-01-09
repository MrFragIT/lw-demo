import {Action} from '@ngrx/store';
import {Server} from '../../core/api/server/server.class';

export enum ServerListActionTypes {
    LoadServers = '[ServerList] Load Servers',
    LoadServersSuccess = '[ServerList] Load Servers Success',
    LoadServersFailure = '[ServerList] Load Servers Failure',
    FilterByStorage = '[ServerList] Filter by storage',
    FilterByRAM = '[ServerList] Filter by RAM',
    FilterByHDD = '[ServerList] Filter by HDD',
    FilterByLocation = '[ServerList] Filter by location',
}

export class LoadServersAction implements Action {
    readonly type = ServerListActionTypes.LoadServers;
}

export class LoadServersSuccessAction implements Action {
    readonly type = ServerListActionTypes.LoadServersSuccess;

    constructor(public payload: Server[]) {
    }
}

export class LoadServersFailureAction implements Action {
    readonly type = ServerListActionTypes.LoadServersFailure;

    constructor(public payload: { reason: string }) {
    }
}

export class FilterByStorage implements Action {
    readonly type = ServerListActionTypes.FilterByStorage;

    constructor(public payload: { min: number, max: number }) {
    }
}

export class FilterByRAM implements Action {
    readonly type = ServerListActionTypes.FilterByRAM;

    constructor(public payload: { memory: number[] }) {
    }
}

export class FilterByHDD implements Action {
    readonly type = ServerListActionTypes.FilterByHDD;

    constructor(public payload: { type: string }) {
    }
}

export class FilterByLocation implements Action {
    readonly type = ServerListActionTypes.FilterByLocation;

    constructor(public payload: { location: string }) {
    }
}

export type Union =
    LoadServersAction
    | LoadServersSuccessAction
    | LoadServersFailureAction
    | FilterByStorage
    | FilterByRAM
    | FilterByHDD
    | FilterByLocation;
