/* tslint:disable:max-line-length */
import {ServerListReducer} from './server-list.reducer';
import {initializeServerListState} from './server-list.state';
import {ApplyFiltersAction, LoadServersAction, LoadServersFailureAction, LoadServersSuccessAction} from './server-list.action';
import {GetServerApiResponseInterface} from '../../core/api/server/servers-api.interface';
import {Server} from '../../core/api/server/server.class';
import {ServerCollection} from '../../core/api/server/server-collection.class';

const validData: GetServerApiResponseInterface = JSON.parse(`{"servers":[
    {"model":"Test1","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"512","unit":"GB","type":"SSD"},"location":"LOC-03","price":{"currency":"EUR","currencySymbol":"€","amountCents":1000}},
    {"model":"Test2","ram":{"memory":"32","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"1","unit":"TB","type":"SATA2"},"location":"LOC-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":2000}},
    {"model":"Test3","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"LOC-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":3000}},
    {"model":"Test4","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"1","unit":"TB","type":"SSD"},"location":"LOC-02","price":{"currency":"EUR","currencySymbol":"€","amountCents":4000}},
    {"model":"Test5","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"2","unit":"TB","type":"SSD"},"location":"LOC-03","price":{"currency":"EUR","currencySymbol":"€","amountCents":5000}}
]}`);

describe('ServerList reducer', () => {
    const initState = initializeServerListState();
    const servers = validData.servers.map(data => new Server(data));
    const collection = new ServerCollection(servers);
    let reducer;

    beforeEach(() => {
        reducer = ServerListReducer;
        collection.reset();
    });

    it('should return a correct state in response to LoadServersAction', () => {
        const action = new LoadServersAction();
        const newState = reducer(initState, action);
        expect(newState).toEqual(initState);
    });

    it('should return a correct state in response to LoadServersSuccessAction', () => {
        const action = new LoadServersSuccessAction(collection);
        const newState = reducer(initState, action);
        expect(newState).toEqual({
            ready: true,
            servers: collection,
            serversCount: 5,
            filteredServersCount: 5,
            filtersOptions: {
                storage: [512, 4096],
                ram: [16, 32],
                hdd: ['SATA2', 'SSD'],
                location: ['LOC-01', 'LOC-02', 'LOC-03']
            },
            filtersValues: {}
        });
    });

    it('should return a correct state in response to LoadServersFailureAction', () => {
        const action = new LoadServersFailureAction({reason: 'Test'});
        const newState = reducer(initState, action);
        expect(newState).toEqual({
            ready: true,
            errorMessage: 'Test'
        });
    });

    it('should return a correct state in response to ApplyFiltersAction', () => {
        const testState = {
            ready: true,
            servers: collection,
            serversCount: 5,
            filteredServersCount: 5,
            filtersOptions: {
                storage: [512, 4096],
                ram: [16, 32],
                hdd: ['SATA2', 'SSD'],
                location: ['LOC-01', 'LOC-02', 'LOC-03']
            },
            filtersValues: {}
        };
        const filterValues = {
            storage: {min: 1024, max: 2048},
            ram: [16],
            hdd: 'SSD',
            location: 'LOC-02'
        };
        const action = new ApplyFiltersAction(filterValues);
        const newState = reducer(testState, action);
        expect(newState.servers.length).toEqual(1);
        expect(newState.servers.servers[0].model).toEqual('Test4');
        expect(newState.filteredServersCount).toEqual(1);
        expect(newState.serversCount).toEqual(5);
        expect(newState.filtersValues).toEqual(filterValues);
    });
});
