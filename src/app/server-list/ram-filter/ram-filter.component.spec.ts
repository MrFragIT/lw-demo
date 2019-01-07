import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RamFilterComponent} from './ram-filter.component';

describe('RamFilterComponent', () => {
    let component: RamFilterComponent;
    let fixture: ComponentFixture<RamFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RamFilterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RamFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
