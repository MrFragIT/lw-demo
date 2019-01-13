import {AppServerList} from './server-list.po';
import {browser, by} from 'protractor';
import {AppCommonUtils} from './common.po';

describe('server-list Page', () => {
    let page: AppServerList;
    let utils: AppCommonUtils = new AppCommonUtils();

    beforeEach(() => {
        page = new AppServerList();
        page.navigateTo();
    });

    it('should display a list of servers', () => {
        expect(page.getServersList().count()).toBe(486);
    });

    it('should display a server-filters element', () => {
        expect(page.getServersFilters().isPresent).toBeTruthy();
    });

    it('should filter by location', () => {
        const locFilter = page.getLocationInput();

        expect(locFilter.isPresent).toBeTruthy();
        locFilter.all(by.css('option[value="1: AmsterdamAMS-01"]')).first().click();

        expect(page.getServersList().count()).toBe(105);
    });

    it('should filter by HDD type', () => {
        const hddFilter = page.getHddInput();

        expect(hddFilter.isPresent()).toBeTruthy();
        hddFilter.all(by.css('option[value="1: SAS"]')).first().click();

        expect(page.getServersList().count()).toBe(11);
    });

    it('should filter by ram', () => {
        const ramFilters = page.getRamInputs();

        expect(ramFilters.count()).toEqual(7);

        // Select first option
        ramFilters.get(0).click();
        expect(page.getServersList().count()).toBe(21);

        // Also select second option
        ramFilters.get(1).click();
        expect(page.getServersList().count()).toBe(56);
    });

    it('should filter by storage', () => {
        const min = page.getStorageInputMin();
        const max = page.getStorageInputMax();

        // Moving min 50px to the right will place filter at 500GB value
        browser.actions().dragAndDrop(min, {x: 50, y: 0}).perform();
        expect(page.getServersList().count()).toBe(321);

        // Moving max 123px to the left will place filter at 2TB value
        browser.actions().dragAndDrop(max, {x: -123, y: 0}).perform();
        expect(page.getServersList().count()).toBe(172);
    });

    it('should show an error message when everything has been filtered out', () => {
        const min = page.getStorageInputMin();
        const ramFilters = page.getRamInputs();

        // Moving min 50px to the right will place filter at 8TB value
        browser.actions().dragAndDrop(min, {x: 173, y: 0}).perform();

        // Add filter by 4GB of ram
        ramFilters.get(0).click();

        // No results should be visible now
        expect(utils.getErrorBox().isPresent()).toBeTruthy();
    });
});
