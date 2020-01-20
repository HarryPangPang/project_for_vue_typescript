import HaMarquee from './src/main.vue';

declare module 'vue/types/vue' {
  interface VueConstructor {
      install: any
  }
}
HaMarquee.install = (Vue:any) => {
  Vue.component('HaMarquee', HaMarquee);
};

export default HaMarquee;
