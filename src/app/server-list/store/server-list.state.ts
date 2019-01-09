import {ServerCollection} from '../../core/api/server/server-collection.class';

export interface ServerListState {
    allServers: ServerCollection;           // Unfiltered list of all fetched servers
    allServersCount: number;                // Total number of servers available

    visibleServers: ServerCollection;       // Filtered list of servers, used by list component
    visibleServersCount: number;            // NUmber of visible servers

    errorMessage?: string;
}

export function initializeServerListState(): ServerListState {
    return {
        allServers: null,
        allServersCount: 0,

        visibleServers: null,
        visibleServersCount: 0,
    };
}
