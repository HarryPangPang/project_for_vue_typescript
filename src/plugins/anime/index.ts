import Vue from 'vue';

import anime from 'animejs';

const install = () => {
  Vue.prototype.$anime = anime;
};

export default { install };
