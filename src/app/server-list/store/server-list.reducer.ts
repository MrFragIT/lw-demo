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
            };

        /**
         * In case of error, add errorMessage attribute
         */
        case ServerListActionTypes.LoadServersFailure:
            // TODO: Implement me please!
            return {
                errorMessage: action.payload.reason
            };

        /**
         * Filter by Storage
         */
        case ServerListActionTypes.FilterByStorage:
            // TODO: Implement this filter!
            return {
                ...state
            };

        /**
         * Filter by RAM
         */
        case ServerListActionTypes.FilterByRAM:
            // TODO: Implement this filter!
            return {
                ...state
            };

        /**
         * Filter by HDD
         */
        case ServerListActionTypes.FilterByHDD:
            // TODO: Implement this filter!
            return {
                ...state
            };

        /**
         * Filter by location
         */
        case ServerListActionTypes.FilterByLocation:
            // TODO: Implement this filter!
            return {
                ...state
            };

        default:
            return state;
    }
}



