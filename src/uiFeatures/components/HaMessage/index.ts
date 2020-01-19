import HaMessage from './src/main.vue';

declare module 'vue/types/vue' {
  interface VueConstructor {
      install: any
  }
}
HaMessage.install = (Vue:any) => {
  Vue.component('HaMessage', HaMessage);
};

export default HaMessage;
