const install = (Vue: any) => {
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$api = {
    css: 'css',
    userinfo: 'userinfo',
    enter: 'enter',
    fireup: 'fireup',
    redeem: 'redeem',
  };
};

export default { install };
