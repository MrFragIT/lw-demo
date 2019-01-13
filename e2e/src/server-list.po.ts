import {browser, by, element} from 'protractor';

export class AppServerList {
    navigateTo() {
        return browser.get('/servers');
    }

    getServersList() {
        return element.all(by.tagName('app-server'));
    }

    getServersFilters() {
        return element(by.tagName('app-server-filters'));
    }

    getLocationInput() {
        return element(by.css('select[formControlName=location]'));
    }

    getHddInput() {
        return element(by.css('select[formControlName=hdd]'));
    }

    getRamInputs() {
        return element.all(by.css('div[formArrayName="ram"] input[type="checkbox"]'));
    }

    getStorageInputMin() {
        return element(by.css('span.ng5-slider-pointer-min'));
    }

    getStorageInputMax() {
        return element(by.css('span.ng5-slider-pointer-max'));
    }
}
