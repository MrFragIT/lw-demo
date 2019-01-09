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
                storage: servers.getStorageFilterOptions(),
                ram: servers.getRAMFilterOptions(),
                hdd: servers.getHDDFilterOptions(),
                location: servers.getLocationFilterOptions()
            };
            return {
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
            // TODO: Implement me please!
            return {
                errorMessage: action.payload.reason
            };

        /**
         * Filter by Storage
         */
        case ServerListActionTypes.FilterByStorage:
            state.servers.applyFilters(state.filtersValues);
            return {
                ...state,
                filteredServersCount: state.servers.length,
                filtersValues: {
                    ...state.filtersValues,
                    storage: {
                        min: action.payload.min,
                        max: action.payload.max
                    }
                }
            };

        /**
         * Filter by RAM
         */
        case ServerListActionTypes.FilterByRAM:
            state.servers.applyFilters(state.filtersValues);
            return {
                ...state,
                filteredServersCount: state.servers.length,
                filtersValues: {
                    ...state.filtersValues,
                    ram: {
                        memory: action.payload.memory
                    }
                }
            };

        /**
         * Filter by HDD
         */
        case ServerListActionTypes.FilterByHDD:
            state.servers.applyFilters(state.filtersValues);
            return {
                ...state,
                filteredServersCount: state.servers.length,
                filtersValues: {
                    ...state.filtersValues,
                    hdd: {
                        type: action.payload.type
                    }
                }
            };

        /**
         * Filter by location
         */
        case ServerListActionTypes.FilterByLocation:
            state.servers.applyFilters(state.filtersValues);
            return {
                ...state,
                filteredServersCount: state.servers.length,
                filtersValues: {
                    ...state.filtersValues,
                    location: {
                        location: action.payload.location
                    }
                }
            };

        default:
            return state;
    }
}
