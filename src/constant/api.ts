const collectionId = process.env.NODE_ENV === 'development' ? '128/api/' : '';

export default {
  css: `${process.env.API_ROOT + collectionId}css`,
  userinfo: `${process.env.API_ROOT + collectionId}userinfo`,
  enter: `${process.env.API_ROOT + collectionId}enter`,
  fireup: `${process.env.API_ROOT + collectionId}fireup`,
  redeem: `${process.env.API_ROOT + collectionId}redeem`,
};
