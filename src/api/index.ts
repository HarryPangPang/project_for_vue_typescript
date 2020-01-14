
const collectionId = process.env.NODE_ENV === 'development' ? '128/api/' : '';
const install = (Vue: any) => {
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$api = {
    css: `${process.env.VUE_APP_API_URL + collectionId}css`,
    userinfo: `${process.env.VUE_APP_API_URL + collectionId}userinfo`,
    enter: `${process.env.VUE_APP_API_URL + collectionId}enter`,
    fireup: `${process.env.VUE_APP_API_URL + collectionId}fireup`,
    redeem: `${process.env.VUE_APP_API_URL + collectionId}redeem`,
  };
};

export default { install };
