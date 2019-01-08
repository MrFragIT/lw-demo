import {Server} from '../../core/api/server/server.class';

export interface ServerListState {
    servers: Server[];
    isLoading: boolean;
    serversCount: number;
    fiteredServersCount: number;
    errorMessage?: string;
}

export function initializeServerListState(): ServerListState {
    return {
        servers: [],
        isLoading: true,
        serversCount: 0,
        fiteredServersCount: 0
    };
}
