import { AxiosPromise } from 'axios';

// eslint-disable-next-line max-len
export type HttpScheme = {
    get:(url:string, params?:any, ...args:any[]) => AxiosPromise<any>;
    post:(url:string, params:any, ...args:any[]) => AxiosPromise<any>;
}
