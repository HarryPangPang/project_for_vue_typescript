const api = {
  css: 'css',
  info: 'info',
  repair: 'repair',
  claim: 'claim',
  draw: 'draw',
};

const install = (Vue: any) => {
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$api = api;
};

export default { install };
export { api };
