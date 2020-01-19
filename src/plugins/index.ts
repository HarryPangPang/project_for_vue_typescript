import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import http from '@/network/http';
import api from '@/api/index';
import haui from '@/uiFeatures/index';

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X',
});
Vue.use(haui);
Vue.use(http);
Vue.use(api);
