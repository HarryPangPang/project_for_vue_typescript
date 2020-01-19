import HaHeader from './src/main.vue';

declare module 'vue/types/vue' {
  interface VueConstructor {
      install: any
  }
}
HaHeader.install = (Vue:any) => {
  Vue.component('HaHeader', HaHeader);
};

export default HaHeader;
