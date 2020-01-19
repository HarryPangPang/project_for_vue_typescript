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
    // 会匹配所有路径
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '../views/common/404.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
