import haToast from './components/haToast/index';
import haDialog from './components/haDialog/index';
import haLoading from './components/haLoading/index';
import haDialogBox from './components/haDialogBox/index';

const components = [
  {
    name: 'haDialog',
    value: haDialog,
  },
  {
    name: 'haDialogBox',
    value: haDialogBox,
  },
];
// eslint-disable-next-line func-names
const install = function (Vue: any, options = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component.value);
  });
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$toast = haToast;
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
  haDialogBox, haLoading, haDialog, haToast,
};
