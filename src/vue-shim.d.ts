import VueRouter, { Route } from 'vue-router';
// 声明vue实例下的属性，否则this.XX会报错
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $toast:any,
    $http:any,
    $api:any
  }
}
