/* eslint-disable */
import HaToast from "./components/HaToast/index";
import HaDialog from "./components/HaDialog/index";
const components = [
  HaDialog
];
const install = function(Vue: any, options = {}) {
  components.forEach(component=>{
    Vue.component(component.name, component);
  })
  Vue.prototype.$toast = HaToast;
};
declare global {
  interface Window {
    Vue: any;
  }
}
/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default { install };
