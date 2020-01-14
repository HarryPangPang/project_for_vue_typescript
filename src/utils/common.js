/* eslint-disable  */
const resetUrl = () => {
  var http = "https:" == document.location.protocol ? "https://" : "http://";
  window.history.replaceState(
    {},
    0,
    http + window.location.host + window.location.pathname
  );
};

const removeUrlParams = name => {
  var query = window.location.search.substr(1);
  if (query.indexOf(name) > -1) {
    var obj = {};
    var arr = query.split("&");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    var url = JSON.stringify(obj)
      .replace(/[\"\{\}]/g, "")
      .replace(/\:/g, "=")
      .replace(/\,/g, "&");
    var http = "https:" == document.location.protocol ? "https://" : "http://";
    window.history.replaceState(
      {},
      0,
      http + window.location.host + window.location.pathname + "?" + url
    );
  }
};

const getLang = () => {
  const acceptableLang = [
    "pt",
    "es",
    "en",
    "ru",
    "ar",
    "fr",
    "th",
    "id",
    "zh-tw",
    "tr",
    "ja",
    "ko",
    "vn"
  ];
  let lang = (navigator.language || navigator.browserLanguage).toLowerCase();
  for (var i = 0; i < acceptableLang.length; i++) {
    acceptableLang[i] = acceptableLang[i].toLowerCase();
    if (lang === acceptableLang[i]) {
      return lang;
    } else if (lang === "zh-tw") {
      return "zh";
    }
  }
  return "en";
};

const getCookie = name => {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const getTime = (time, config) => {
  if (!config) config = "UTC";
  if (config === "UTC") {
    return new Date(time * 1000);
  }
  // 不知道还有什么要用
  // if(config === 'local'){
  //   let setDate = new Date(time*1000)
  //   let dateOffset = new Date().getTimezoneOffset()*6000

  //   return new Date(time*1000)
  // }
};
const updateGlobalData = (vm, ...source) => {
  if (vm.globalConfig) {
    // console.log(vm.globalConfig.userInfo)
    Object.assign(vm.globalConfig.userInfo, ...source);
    // console.log(vm.globalConfig.userInfo)
  } else {
    throw new Error("update global data error");
  }
};
/**
 *
 * @param {*} error
 * @param {*} transify
 * @param {*} vm  this
 */
const catchTransify = (error, transify, vm) => {
  console.log(error);
  if (error && error.msg) {
    if (transify[error.msg]) {
      vm.$wsMessage(transify[error.msg], false, true);
    } else {
      vm.$wsMessage("network", false, true);
    }
  } else {
    vm.$wsMessage("network", false, true);
  }
};
export default {
  resetUrl,
  getLang,
  getCookie,
  removeUrlParams,
  getTime,
  updateGlobalData,
  catchTransify
};
