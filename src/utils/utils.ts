import { timeFn } from 'vue-analytics';

/* eslint-disable max-len */
/**
 *
 * @param {*} error
 * @param {*} transify
 * @param {*} vm  this
 */
export const catchTransify = (error:any, transify:any, vm:any) => {
  if (error && error.msg) {
    if (transify[error.msg]) {
      vm.$haMessage(transify[error.msg], false, true);
    } else {
      vm.$haMessage('network', false, true);
    }
  } else {
    vm.$haMessage('network', false, true);
  }
};

// eslint-disable-next-line consistent-return
export const getTime = (time:number, config:string) => {
  let thisConfig:string = '';
  if (!config) {
    thisConfig = 'UTC';
  } else {
    thisConfig = config;
  }
  if (thisConfig === 'UTC') {
    return new Date(time * 1000);
  }
  // 不知道还有什么要用
  // if(config === 'local'){
  //   let setDate = new Date(time*1000)
  //   let dateOffset = new Date().getTimezoneOffset()*6000

  //   return new Date(time*1000)
  // }
};
export const getCookie = (name:string) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};
/**
 * 删除url 参数
 * @param name 删除参数键名
 */
export const removeUrlParams = (name:string) => {
  const url = window.location.href;
  const serachUrls = url.split('?');
  const searchsExpression = serachUrls[1].split('&');
  const searchsExpressionCopy = JSON.parse(JSON.stringify(searchsExpression));
  searchsExpression.forEach((expression:any, index:number) => {
    // eslint-disable-next-line no-param-reassign
    expression = expression.split('=');
    if (expression[0] === name) {
      searchsExpressionCopy.splice(index, 1);
    }
  });
  let finalUrl = `${serachUrls[0]}`;
  searchsExpressionCopy.forEach((copy:string, index:number) => {
    if (index === 0) {
      finalUrl = `${finalUrl}?${copy}`;
    } else {
      finalUrl = `${finalUrl}&${copy}`;
    }
  });
  window.history.pushState({}, 'web_event', finalUrl);
};

export const getLang = () => {
  const acceptableLang = [
    'pt',
    'es',
    'en',
    'ru',
    'ar',
    'fr',
    'th',
    'id',
    'zh-tw',
    'tr',
    'ja',
    'ko',
    'vn',
  ];
  const lang = navigator.language.toLowerCase();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < acceptableLang.length; i++) {
    acceptableLang[i] = acceptableLang[i].toLowerCase();
    if (lang === acceptableLang[i]) {
      return lang;
    } if (lang === 'zh-tw') {
      return 'zh';
    }
  }
  return 'en';
};

// 台湾团队
export const getLangForTW = () => {
  const acceptableLang = ['en', 'es', 'fr', 'id', 'pt', 'ru', 'th', 'tr', 'vi', 'zh', 'ko', 'ja', 'ar', 'de', 'jv', 'ms'];
  const lang = navigator.language.toLowerCase();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < acceptableLang.length; i++) {
    acceptableLang[i] = acceptableLang[i].toLowerCase();
    if (lang === acceptableLang[i]) {
      return lang;
    } if (lang === 'zh-tw') {
      return 'zh';
    }
  }
  return 'en';
};

interface regionMap{
  [key: string]: any;
}
// 如果没有region或者region错误，直接返回US_en。如果是默认语言，则返回region，否则返回region_lang
export const getRegionLang = (region:string = 'US', lang:string = 'en') => {
  const regionMap:regionMap = {
    BR: {
      default: 'pt',
      other: [],
    },
    SAC: {
      default: 'es',
      other: [],
    },
    VN: {
      default: 'vn',
      other: [],
    },
    SG: {
      default: 'en',
      other: [],
    },
    RU: {
      default: 'ru',
      other: [],
    },
    IND: {
      default: 'en',
      other: [],
    },
    ME: {
      default: '',
      other: ['ar', 'fr', 'en'],
    },
    TW: {
      default: 'zh-tw',
      other: ['ja', 'ko'], // 此处为了迎合后台，对应的是transify
    },
    TH: {
      default: 'th',
      other: ['en'],
    },
    US: {
      default: 'en',
      other: [],
    },
    ID: {
      default: 'id',
      other: [],
    },
    EU: {
      default: '',
      other: ['tr', 'en'],
    },
    EUROPE: {
      default: '',
      other: ['tr', 'en'],
    },
    NA: {
      default: '',
      other: ['es', 'en'],
    },
  };
  let regionLang = '';
  if (regionMap[region].default === lang || regionMap[region].other.indexOf(lang) < 0) {
    if (region === 'ME') {
      // ME区 除了ME_fr 其他都是ME_ar
      regionLang = 'ME_ar';
    } else {
      regionLang = region === 'EU' ? 'EUROPE_en' : region;
    }
  } else {
    regionLang = region === 'EU' ? `EUROPE_${lang}` : `${region}_${lang}`;
  }
  return regionLang;
};
/**
 *
 * @param time
 * 获取时间
 */
export const getCusTime = (time:number) => {
  if (!time) {
    return '--';
  }
  const times = new Date(time * 1000);
  const month = times.toDateString().split(' ')[1];
  const day = times.toDateString().split(' ')[2];
  const hours = times.getHours();
  const minutes = times.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  return times.toLocaleString();
  //   month + "\v" + day + "\v" + "at" + "\v" + hours + ":" + minutes + ampm
};
/**
 *
 * @param {*} vm
 * @param {*} dom
 * @param {*} type height/width
 * @param {*} plus 扩展数值
 * @param {*} fn
 */
export const judeOverflow = (vm:any, dom:any, type:any, plus:any, fn:any) => {
  let timer:any;
  vm.$nextTick(() => {
    timer = setTimeout(() => {
      if (type === 'height') {
        // console.log(dom.clientHeight)
        // console.log(dom.scrollHeight)
        if (dom.clientHeight + plus < dom.scrollHeight) {
          fn();
        }
      }
      if (type === 'width') {
        if (dom.clientWidth + plus < dom.scrollWidth) {
          fn();
        }
      }
      clearTimeout(timer);
      timer = null;
    }, 300);
  });
};
/**
 * 判断手机类型
 */
export const checkMobileAgent = () => {
  const u = window.navigator.userAgent; const
    app = navigator.appVersion;
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
    // eslint-disable-next-line eqeqeq
    // qq: u.match(/\sQQ/i) === ' qq', // 是否QQ
  };
};
/**
 * 判断浏览器类型
 */
export const checkUserAgent = () => {
  const naviVersion = window.navigator.userAgent;
  let sBrowser;
  const sUsrAg = navigator.userAgent;

  // The order matters here, and this may report false positives for unlisted browsers.

  if (sUsrAg.indexOf('Firefox') > -1) {
    sBrowser = 'Mozilla Firefox';
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
  } else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
    sBrowser = 'Opera';
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
  } else if (sUsrAg.indexOf('Trident') > -1) {
    sBrowser = 'Microsoft Internet Explorer';
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
  } else if (sUsrAg.indexOf('Edge') > -1) {
    sBrowser = 'Microsoft Edge';
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
  } else if (sUsrAg.indexOf('Chrome') > -1) {
    sBrowser = 'Google Chrome or Chromium';
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
  } else if (sUsrAg.indexOf('Safari') > -1) {
    sBrowser = 'Apple Safari';
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
  } else {
    sBrowser = 'unknown';
  }
  return naviVersion;
};


/**
 *
 * @param endTime 结束时间
 * 返回倒计时时间，用法
 *  setInterval(() => {
      const result = getTimeLeft(1602374400);
      this.countTime.DAYS = result.DAYS;
      this.countTime.HOURS = result.HOURS;
      this.countTime.MINUTES = result.MINUTES;
      this.countTime.SECONDS = result.SECONDS;
    }, 1000);
 */
export const getTimeLeft = (endTime:number) => {
  let nowDate:number; let endDate:number; let timer:any; let leftTime:number;
  let d:any; let h:any; let m:any; let s:any;

  function addZero(i:number) {
    if (i < 10) {
      return `0${i}`;
    }
    return i;
  }
  // eslint-disable-next-line prefer-const
  nowDate = new Date().getTime();
  // eslint-disable-next-line prefer-const
  endDate = endTime * 1000;
  if (endDate < nowDate) {
    clearInterval(timer);
    timer = null;
    return {
      DAYS: 0,
      HOURS: 0,
      MINUTES: 0,
      SECONDS: 0,
    };
  }
  if (endDate > nowDate) {
    leftTime = (endDate - nowDate) / 1000;
    d = Math.floor(leftTime / (24 * 60 * 60));
    h = addZero(Math.floor((leftTime / (60 * 60)) % 24));
    m = addZero(Math.floor((leftTime / 60) % 60));
    s = addZero(Math.floor(leftTime % 60));
  }
  return {
    DAYS: d,
    HOURS: h,
    MINUTES: m,
    SECONDS: s,
  };
};

// 重新排序数组对象
// eslint-disable-next-line consistent-return
export const resortArraryObject = (arr:[], name:string) => {
  if (arr.length < 2) {
    return arr;
  }
  const tmpArrary = JSON.parse(JSON.stringify(arr));
  tmpArrary.sort((a:any, b:any) => {
    if (a[name] > b[name]) return 1;
    if (a[name] < b[name]) return -1;
    return 0;
  });
  return tmpArrary;
};
