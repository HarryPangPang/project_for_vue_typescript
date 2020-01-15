import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Register.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
  },
  {
    path: '/download',
    name: 'download',
    component: () => import(/* webpackChunkName: "download" */ '../views/Download.vue'),
  },
  {
    path: '/report',
    name: 'report',
    component: () => import(/* webpackChunkName: "report" */ '../views/Report.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => { window.location.href = `${process.env.VUE_APP_API_ENDPOINT}auth/logout`; },
  },
  {
    // 会匹配所有路径
    path: '*',
    component: () => import(/* webpackChunkName: "report" */ '../views/common/404.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
