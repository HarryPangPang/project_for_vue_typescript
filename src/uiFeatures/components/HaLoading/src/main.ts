import Vue from 'vue';
import Main from './main.vue';

const HaLoadingConstructor = Vue.extend(Main);
let instance: any;
interface options {
  msg?: String;
  visable:Boolean,
  onClose?: Function;
}
/* eslint-disable */
const haLoading = function (options: options) {
  if(!instance){
    instance = new HaLoadingConstructor({
      data: options,
    });
  }
  Object.assign(instance,options)
  //   let userOnClose = options.onClose;
  options.onClose = function () {
    haLoading.close();
  };
  instance.$mount();
  document.body.appendChild(instance.$el);
};
haLoading.close = function () {
  instance.close();
};

export default haLoading;
