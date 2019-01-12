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
            const filtersOptions = {
                storage: servers.getStorageFilterLimits(),
                ram: servers.getRAMFilterOptions(),
                hdd: servers.getHDDFilterOptions(),
                location: servers.getLocationFilterOptions()
            };
            return {
                ready: true,
                servers: servers,
                serversCount: servers.length,
                filteredServersCount: servers.length,
                filtersOptions,
                filtersValues: {
                    storage: {
                        min: filtersOptions.storage[0],
                        max: filtersOptions.storage[filtersOptions.storage.length - 1]
                    }
                }
            };

        /**
         * In case of error, add errorMessage attribute
         */
        case ServerListActionTypes.LoadServersFailure:
            return {
                ready: true,
                errorMessage: action.payload.reason
            };

        /**
         * Apply Filters
         */
        case ServerListActionTypes.ApplyFilters: {
            state.servers.reset().applyFilters(action.payload);
            return {
                ...state,
                filteredServersCount: state.servers.length,
                filtersValues: action.payload
            };
        }

        default:
            return state;
    }
}
