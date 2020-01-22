/* eslint-disable no-param-reassign */
import HaToast from './components/HaToast/index';
import HaDialog from './components/HaDialog/index';
import HaLoading from './components/HaLoading/index';
import HaMessage from './components/HaMessage/index';
import HaMarquee from './components/HaMarquee/index';

// directive
import marquee from './directives/marquee/index';
import visibility from './directives/visable/index';

const directives = [
  {
    name: 'marquee',
    value: marquee,
  },
  {
    name: 'visibility',
    value: visibility,
  },
];

const components = [
  {
    name: 'HaDialog',
    value: HaDialog,
  },
  {
    name: 'HaMarquee',
    value: HaMarquee,
  },
];
// eslint-disable-next-line func-names
const install = function (Vue: any, options = {}) {
  directives.forEach((directive) => {
    Vue.directive(directive.name, directive.value);
  });
  components.forEach((component) => {
    Vue.component(component.name, component.value);
  });
  Vue.prototype.$toast = HaToast;
  Vue.prototype.$message = HaMessage;
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
  HaLoading, HaDialog, HaToast, HaMessage,
};
