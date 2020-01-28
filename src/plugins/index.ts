/* eslint-disable import/no-named-as-default */
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import http from '@/network/http';
import api from '@/api/index';
import haui from '@/uiFeatures/index';
import animejs from './anime/index';

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
});
Vue.use(haui);
Vue.use(animejs);
Vue.use(http);
Vue.use(api);
