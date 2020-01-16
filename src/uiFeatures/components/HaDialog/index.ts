import haDialog from './src/main.vue';

declare module 'vue/types/vue' {
  interface VueConstructor {
      install: any
  }
}
haDialog.install = (Vue:any) => {
  Vue.component('haDialog', haDialog);
};

export default haDialog;
