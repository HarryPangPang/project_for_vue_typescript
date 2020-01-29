export const isVNode = function (node:object, key:string) {
  const { hasOwnProperty } = Object.prototype;
  return hasOwnProperty.call(node, key);
};
