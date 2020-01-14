import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ui from './uiFeatures/index';
import '@/assets/css/_reset.scss';
import http from '@/network/http';

Vue.config.productionTip = false;
Vue.use(ui);
Vue.use(http);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
