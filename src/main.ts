import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import http from '@/network/http';
import api from '@/api/index';
import './plugins/element';

Vue.config.productionTip = false;
Vue.use(http);
Vue.use(api);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
