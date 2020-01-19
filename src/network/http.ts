/* eslint-disable no-param-reassign */
import Vue from 'vue';
import axios, { AxiosStatic } from 'axios';
import { HaLoading, HaToast } from '@/uiFeatures/index';

const { CancelToken } = axios;

declare module 'vue/types/vue' {
  interface VueConstructor {
    $toast: any;
  }
  interface Vue {
    axios: AxiosStatic;
  }
}
interface errorMsg{
  type:string
  message:string
}
// 基础地址
const BASE_URL = process.env.VUE_APP_API_URL;
// 错误返回
const errorMsg:errorMsg = {
  type: 'error',
  message: 'unhandle',
};
// 请求集合，防止重复点击
const requestUrls: string[] = [];
let requestFlag:string = '';

/* 创建axios实例 */
const service = axios.create({
  timeout: 3000, // 请求超时时间
  baseURL: BASE_URL,
  withCredentials: true,
});
const regex = /.*csrftoken=([^;.]*).*$/; // 用于从cookie中匹配 csrftoken值

// 错误处理
const handleError = (errormsg:String) => {
  HaToast({
    visable: true,
    msg: errormsg,
  });
};

// 请求加载框 如果不需要返回空
const handleLoading = (visable:Boolean) => {
  HaLoading({
    visable,
  });
};

/* request拦截器 */
service.interceptors.request.use(
  // eslint-disable-next-line consistent-return
  (config: any) => {
    handleLoading(true);
    // 重复点击start=======
    requestFlag = config.url + config.method;
    if (requestUrls.indexOf(requestFlag) > -1) {
      config.cancelToken = new CancelToken((cancel:any) => {
        errorMsg.message = 'duplicate request';
        cancel('duplicate request');
      });
    } else {
      requestUrls.push(requestFlag);
      config.headers['X-CSRFToken'] = document.cookie.match(regex) ? document.cookie.match(regex)![1] : null;
    }
    // 重复点击end=======
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

/* respone拦截器 */
service.interceptors.response.use(
  (response: any) => {
    handleLoading(false);
    requestUrls.splice(requestUrls.indexOf(requestFlag), 1);
    // 移除队列中的该请求，注意这时候没有传第二个参数f
    return response;
  },
  (error: any) => {
    // 异常处理
    if (error.message && error.message === 'duplicate request') {
      errorMsg.message = 'duplicate request';
      return Promise.reject(errorMsg);
    }
    handleLoading(false);
    if (error.message && error.message.indexOf('timeout') > -1) {
      requestUrls.splice(requestUrls.indexOf(requestFlag), 1);
      errorMsg.message = 'request timeout';
      handleError(errorMsg.message);
      return Promise.reject(errorMsg);
    }
    handleError(errorMsg.message);
    requestUrls.splice(requestUrls.indexOf(requestFlag), 1);
    return Promise.reject(error);
  },
);

const install = () => {
  Vue.prototype.$http = service;
};

export default { install };
