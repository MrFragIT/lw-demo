import {Server} from '../../core/api/server/server.class';

export interface ServerListState {
    allServers: Server[];           // Unfiltered list of all fetched servers
    allServersCount: number;        // Total number of servers available

    visibleServers: Server[];       // Filtered list of servers, used by list component
    visibleServersCount: number;    // NUmber of visible servers

    isLoading: boolean;
    errorMessage?: string;
}

export function initializeServerListState(): ServerListState {
    return {
        allServers: [],
        allServersCount: 0,

        visibleServers: [],
        visibleServersCount: 0,

        isLoading: true,
    };
}
