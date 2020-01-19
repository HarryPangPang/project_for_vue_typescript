import { AxiosPromise } from 'axios';

// eslint-disable-next-line max-len
export type HttpScheme = {
    get:(url:string, params?:[string, object, number, []], ...args:any[]) => AxiosPromise<any>;
    post:(url:string, params:[string, object, number, []], ...args:any[]) => AxiosPromise<any>;
}
