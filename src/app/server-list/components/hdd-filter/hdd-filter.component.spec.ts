import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HddFilterComponent} from './hdd-filter.component';

describe('HddFilterComponent', () => {
    let component: HddFilterComponent;
    let fixture: ComponentFixture<HddFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HddFilterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HddFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
