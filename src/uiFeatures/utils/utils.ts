export const isVNode = (node:object, key:string) => {
  const { hasOwnProperty } = Object.prototype;
  return hasOwnProperty.call(node, key);
};

export const flag = () => {};
