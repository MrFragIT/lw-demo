/* tslint:disable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ServerComponent} from './server.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AmountCentsPipe} from '../../../shared/pipes/amountCents/amountCents.pipe';
import {GetServerApiResponseInterface, ServerApiInterface} from '../../../core/api/server/servers-api.interface';
import {Server} from '../../../core/api/server/server.class';

const validData4TB: GetServerApiResponseInterface = JSON.parse(`{"servers":[{"model":"Dell R210Intel Xeon X3440","ram":{"memory":"16","unit":"GB","type":"DDR3"},"hdd":{"memory":"2","count":"2","unit":"TB","type":"SATA2"},"location":"AmsterdamAMS-01","price":{"currency":"EUR","currencySymbol":"€","amountCents":4999}}]}`);

describe('ServerComponent', () => {
    let component: ServerComponent;
    let fixture: ComponentFixture<ServerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServerComponent, AmountCentsPipe],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        const validInput: ServerApiInterface = validData4TB.servers[0];
        fixture = TestBed.createComponent(ServerComponent);
        component = fixture.componentInstance;
        component.server = new Server(validInput);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
