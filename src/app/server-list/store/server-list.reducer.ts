import {initializeServerListState, ServerListState} from './server-list.state';
import * as Actions from './server-list.action';
import {ServerListActionTypes} from './server-list.action';
import {Server} from '../../core/api/server/server.class';

export function ServerListReducer(
    state: ServerListState = initializeServerListState(),
    action: Actions.Union
) {
    switch (action.type) {
        /**
         * LoadServersAction will, basically, reset everything to initial state
         */
        case ServerListActionTypes.LoadServers:
            return initializeServerListState();

        /**
         *  In case of success, populate servers array and related variables
         */
        case ServerListActionTypes.LoadServersSuccess:
            const servers = <Server[]>action.payload;
            return {
                ...state,
                servers,
                isLoading: false,
                serversCount: servers.length,
                filteredServersCount: servers.length
            };

        /**
         * In case of error, add errorMessage attribute
         */
        case ServerListActionTypes.LoadServersFailure:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload.reason
            };

        default:
            return state;
    }
}
