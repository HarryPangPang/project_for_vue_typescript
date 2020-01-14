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
const HaLoading = function (options: options) {
  if(!instance){
    instance = new HaLoadingConstructor({
      data: options,
    });
  }
  Object.assign(instance,options)
  //   let userOnClose = options.onClose;
  options.onClose = function () {
    HaLoading.close();
  };
  instance.$mount();
  document.body.appendChild(instance.$el);
};
HaLoading.close = function () {
  instance.close();
};

export default HaLoading;
