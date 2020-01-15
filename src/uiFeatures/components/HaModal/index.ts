import HaModal from './src/main.vue';

declare module 'vue/types/vue' {
  interface VueConstructor {
      install: any
  }
}
HaModal.install = (Vue:any) => {
  Vue.component('HaModal', HaModal);
};

export default HaModal;
