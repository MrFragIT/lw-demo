/* tslint:disable:max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ServerFiltersComponent} from './server-filters.component';
import {FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng5SliderModule} from 'ng5-slider';
import {Store, StoreModule} from '@ngrx/store';
import {ServerListReducer} from '../../store/server-list.reducer';
import {GetServerApiResponseInterface} from '../../../core/api/server/servers-api.interface';
import {Server} from '../../../core/api/server/server.class';
import {ServerCollection} from '../../../core/api/server/server-collection.class';
import {ApplyFiltersAction, LoadServersSuccessAction} from '../../store/server-list.action';
import {ServerListState} from '../../store/server-list.state';

const validResponse: GetServerApiResponseInterface = JSON.parse(`{"servers":[
    {"model":"Test1","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"512","unit":"GB","type":"SSD"},"location":"LOC-03","price":{"currency":"EUR","currencySymbol":"€","amountCents":1000}},
    {"model":"Test2","ram":{"memory":"32","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"1","unit":"TB","type":"SATA2"},"location":"LOC-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":2000}},
    {"model":"Test3","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"LOC-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":3000}},
    {"model":"Test4","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"1","unit":"TB","type":"SSD"},"location":"LOC-02","price":{"currency":"EUR","currencySymbol":"€","amountCents":4000}},
    {"model":"Test5","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"1","count":"2","unit":"TB","type":"SSD"},"location":"LOC-03","price":{"currency":"EUR","currencySymbol":"€","amountCents":5000}}
]}`);

describe('ServerFiltersComponent', () => {
    let component: ServerFiltersComponent;
    let fixture: ComponentFixture<ServerFiltersComponent>;
    let store: Store<ServerListState>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                Ng5SliderModule,
                StoreModule.forRoot({
                    serverList: ServerListReducer
                })
            ],
            declarations: [ServerFiltersComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
        fixture = TestBed.createComponent(ServerFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('upon creation, ready state should be false', () => {
        expect(component.ready).toEqual(false);
    });

    it('should set-up filters when filterOptions are available in state', () => {
        const servers = validResponse.servers.map(s => new Server(s));
        const collection = new ServerCollection(servers);

        store.dispatch(new LoadServersSuccessAction(collection));
        expect(component.filtersOptions).toBeTruthy();
        expect((component.filtersForm.get('ram') as FormArray).length).toEqual(2);
        expect(component.ready).toEqual(true);
    });

    it('should dispatch ApplyFiltersAction witch correct values when filters are set', () => {
        const expectedPayload = {
            storage: {min: 100, max: 200},
            ram: [32],
            hdd: 'SSD',
            location: 'LOC-02'
        };
        const action = new ApplyFiltersAction(expectedPayload);
        const servers = validResponse.servers.map(s => new Server(s));
        const collection = new ServerCollection(servers);

        store.dispatch(new LoadServersSuccessAction(collection));
        component.filtersForm.get('storage').patchValue([100, 200]);
        component.filtersForm.get('ram').patchValue([false, true]);
        component.filtersForm.get('hdd').patchValue('SSD');
        component.filtersForm.get('location').patchValue('LOC-02');
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
});
