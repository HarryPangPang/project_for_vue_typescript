import Vue from 'vue';
import Main from './main.vue';

const HaToastConstructor = Vue.extend(Main);
let instance: any;
interface options {
  delay?: number;
  msg?: String;
  visable:Boolean,
  onClose?: Function;
}
/* eslint-disable */
const haToast = function (options: options) {
  if(!instance){
    instance = new HaToastConstructor({
      data: options,
    });
  }
  Object.assign(instance,options)
  //   let userOnClose = options.onClose;
  options.onClose = function () {
    haToast.close();
  };
  if(options.delay){
    const timer = setTimeout(() => {
      haToast.close();
      clearTimeout(timer)
    }, options.delay);
  }
  instance.$mount();
  document.body.appendChild(instance.$el);
};
haToast.close = function () {
  instance.close();
};

export default haToast;
