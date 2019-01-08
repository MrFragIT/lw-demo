import {initializeServerListState, ServerListState} from './server-list.state';
import * as Actions from './server-list.action';
import {ServerListActionTypes} from './server-list.action';

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
         *  In case of success, populate allServers. No filter is applied now
         */
        case ServerListActionTypes.LoadServersSuccess:
            const servers = action.payload;
            const serversCount = servers.length;

            return {
                ...state,
                allServers: servers,
                allServersCount: serversCount,
                visibleServers: servers,
                visibleServersCount: serversCount,
                isLoading: false,
            };

        /**
         * In case of error, add errorMessage attribute
         */
        case ServerListActionTypes.LoadServersFailure:
            return {
                isLoading: false,
                errorMessage: action.payload.reason
            };

        default:
            return state;
    }
}
