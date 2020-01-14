export const isVNode = function(node:object,key:string){
    const hasOwnProperty = Object.prototype.hasOwnProperty
    return hasOwnProperty.call(node, key);
}