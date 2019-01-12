/* tslint:disable:max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ServerListComponent} from './server-list.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Store, StoreModule} from '@ngrx/store';
import {ServerListReducer} from '../../store/server-list.reducer';
import {ServerListState} from '../../store/server-list.state';
import {LoadServersAction, LoadServersFailureAction, LoadServersSuccessAction} from '../../store/server-list.action';
import {GetServerApiResponseInterface} from '../../../core/api/server/servers-api.interface';
import {ServerCollection} from '../../../core/api/server/server-collection.class';
import {Server} from '../../../core/api/server/server.class';

const validResponse: GetServerApiResponseInterface = JSON.parse(`{"servers":[
    {"model":"Test1","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"512","unit":"GB","type":"SSD"},"location":"LOC-03","price":{"currency":"EUR","currencySymbol":"€","amountCents":1000}},
    {"model":"Test2","ram":{"memory":"32","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"1","unit":"TB","type":"SATA2"},"location":"LOC-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":2000}},
    {"model":"Test3","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"LOC-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":3000}},
    {"model":"Test4","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"1","unit":"TB","type":"SSD"},"location":"LOC-02","price":{"currency":"EUR","currencySymbol":"€","amountCents":4000}},
    {"model":"Test5","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"2","unit":"TB","type":"SSD"},"location":"LOC-03","price":{"currency":"EUR","currencySymbol":"€","amountCents":5000}}
]}`);

describe('ServerListComponent', () => {
    let component: ServerListComponent;
    let fixture: ComponentFixture<ServerListComponent>;
    let store: Store<ServerListState>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    serverList: ServerListReducer
                })
            ],
            declarations: [ServerListComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
        fixture = TestBed.createComponent(ServerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch LoadServers action when created', () => {
        const action = new LoadServersAction();
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should find needed fields after a LoadServerSuccess action', () => {
        const servers = validResponse.servers.map(s => new Server(s));
        const collection = new ServerCollection(servers);

        store.dispatch(new LoadServersSuccessAction(collection));
        component.state$.subscribe(data => {
            expect(data.servers).toEqual(jasmine.any(ServerCollection));
            expect(data.servers.length).toEqual(5);
            expect(data.serversCount).toEqual(5);
            expect(data.filteredServersCount).toEqual(5);
            expect(data.filtersOptions).toBeDefined();
            expect(data.filtersValues).toBeDefined();
        });
    });

    it('should find needed fields from a LoadServerFailure action', () => {
        const reason = 'You shall not pass!!!';

        store.dispatch(new LoadServersFailureAction({reason}));
        component.state$.subscribe(data => {
            expect(data.servers).toBeUndefined();
            expect(data.errorMessage).toEqual(reason);
        });

    });
});
