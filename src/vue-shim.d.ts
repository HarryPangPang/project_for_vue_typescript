import VueRouter, { Route } from 'vue-router';

import { HttpScheme, ToastScheme } from './types/http.d';
// 声明vue实例下的属性，否则this.XX会报错
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $toast: (object: {msg: String, visable:Boolean, delay?:number, onClose?: Function}) => void,
    $message: (object: {msg: String, visable:Boolean, delay?:number, onClose?: Function}) => void,
    $http: HttpScheme,
    $api:any,
    $anime:any,
  }
}
