/* eslint-disable */
const loaderUtils = require('loader-utils');
module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    if (!this.cacheable || !options) {
        return source;
    }
    const uiHeight = options.uiHeight ||737
    const uiWidth = options.uiWidth || 1283
    const decimal = options.decimal || 3
    // this.cacheable();
    let sources = source
    // /([0-9.]+px)([;,| |}|'|"\)\r|\n])/g;
    const pxReg = /([0-9.]+px)([;,| |}|'|"\r|\n])/g;
    let pxvh,pxvhw,final
    // 正常屏幕
    pxvh = sources.replace(pxReg, function(match,m1,m2){
        var pxValue = parseFloat(m1.slice(0, m1.length - 2));
        return ((pxValue / uiHeight) * 100).toFixed(decimal) +'vh'+m2
    })
    // 宽屏幕
    pxvhw = sources.replace(pxReg, function(match,m1,m2){
        var pxValue = parseFloat(m1.slice(0, m1.length - 2));
        return ((pxValue / uiWidth) * 100).toFixed(decimal) +'vw'+m2
    })
    
    finalSource = pxvh+ '\n'+ '@media screen and (max-aspect-ratio: 16/9){'+'\n' + pxvhw+'\n'+'}'
    return finalSource;
};

