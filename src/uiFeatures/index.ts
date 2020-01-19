import HaToast from './components/HaToast/index';
import HaDialog from './components/HaDialog/index';
import HaLoading from './components/HaLoading/index';
import HaHeader from './components/HaHeader/index';
import HaMessage from './components/HaMessage/index';

const components = [
  {
    name: 'HaDialog',
    value: HaDialog,
  },
  {
    name: 'HaHeader',
    value: HaHeader,
  },
];
// eslint-disable-next-line func-names
const install = function (Vue: any, options = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component.value);
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

export default { install };
export {
  HaLoading, HaDialog, HaToast, HaHeader, HaMessage,
};
