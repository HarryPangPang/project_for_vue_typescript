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
