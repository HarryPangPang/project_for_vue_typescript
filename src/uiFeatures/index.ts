import HaToast from './components/HaToast/index';
import HaDialog from './components/HaDialog/index';
import HaLoading from './components/HaLoading/index';

const components = [
  HaDialog,
];
// eslint-disable-next-line func-names
const install = function (Vue: any, options = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$toast = HaToast;
};
declare global {
  interface Window {
    Vue: any;
  }
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  HaToast,
  HaLoading,
};
