import {by, element} from 'protractor';

export class AppCommonUtils {
    getErrorBox() {
        return element(by.tagName('app-error-box'));
    }
}
