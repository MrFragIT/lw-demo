import {Action} from '@ngrx/store';
import {Server} from '../../core/api/server/server.class';

export enum ServerListActionTypes {
    LoadServers = '[Server-List] Load Servers',
    LoadServersSuccess = '[Server-List] Load Servers Success',
    LoadServersFailure = '[Server-List] Load Servers Failure'
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

export type Union = LoadServersAction | LoadServersSuccessAction | LoadServersFailureAction;
