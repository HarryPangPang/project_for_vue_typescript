import HaDialog from './src/main.vue';

declare module 'vue/types/vue' {
  interface VueConstructor {
      install: any
  }
}
HaDialog.install = (Vue:any) => {
  Vue.component('HaDialog', HaDialog);
};

export default HaDialog;
