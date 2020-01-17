import haDialogBox from './src/main.vue';

declare module 'vue/types/vue' {
  interface VueConstructor {
      install: any
  }
}
haDialogBox.install = (Vue:any) => {
  Vue.component('haDialogBox', haDialogBox);
};

export default haDialogBox;
