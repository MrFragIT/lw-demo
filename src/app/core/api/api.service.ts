import {environment} from '../../../environments/environment';

export abstract class ApiService {
    protected getEndpoint(name: string): string {
        return environment.apiEndpoint + name;
    }
}
