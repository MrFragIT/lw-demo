import {ApplyFiltersParameters, ServerCollection} from '../../core/api/server/server-collection.class';

export interface ServerListState {
    servers: ServerCollection;              // Collection of servers
    serversCount: number;                   // Number of servers available
    filteredServersCount: number;           // Number of visible servers
    filtersOptions?: {                      // Possible options for filters
        storage: number[];
        ram: number[];
        hdd: string[];
        location: string[];
    };
    filtersValues?: ApplyFiltersParameters; // Object containing the state of applied filters;
    errorMessage?: string;                  // If set, something bad has happened
}

export function initializeServerListState(): ServerListState {
    return {
        servers: null,
        serversCount: 0,
        filteredServersCount: 0
    };
}
