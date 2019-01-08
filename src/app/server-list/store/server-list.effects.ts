import {Injectable} from '@angular/core';
import {ServersApiService} from '../../core/api/server/servers-api.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {LoadServersFailureAction, LoadServersSuccessAction, ServerListActionTypes} from './server-list.action';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class ServerListEffects {
    /**
     *  Listen for the LoadServersAction action.
     *  Returns LoadServersSuccessAction action if everything is OK or
     *  Load ServersFailure in case of trouble
     */
    @Effect()
    loadServers$: Observable<Action> = this.actions$.pipe(
        ofType(ServerListActionTypes.LoadServers),
        mergeMap(
            () => this.serverApi.getServers().pipe(
                map(servers => new LoadServersSuccessAction(servers)),
                catchError((err) => of(new LoadServersFailureAction({reason: err})))
            )
        )
    );

    constructor(
        private readonly serverApi: ServersApiService,
        private readonly actions$: Actions
    ) {
    }
}
