import haModal from './src/main.vue';

declare module 'vue/types/vue' {
  interface VueConstructor {
      install: any
  }
}
haModal.install = (Vue:any) => {
  Vue.component('haModal', haModal);
};

export default haModal;
