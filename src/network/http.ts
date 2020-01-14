import Vue from 'vue';
import axios, { AxiosStatic } from 'axios';

declare module 'vue/types/vue' {
    interface VueConstructor {
        $toast: any
    }
    interface Vue {
        axios: AxiosStatic;
    }
}
const BASE_URL = process.env.VUE_APP_API_URL;
/* 防止重复提交，利用axios的cancelToken */
let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const { CancelToken } = axios;

const removePending: any = (config: any, f: any) => {
  // 获取请求的url
  const flagUrl = config.url;
  // 判断该请求是否在请求队列中
  if (pending.indexOf(flagUrl) !== -1) {
    // 如果在请求中，并存在f,f即axios提供的取消函数
    if (f) {
      f('取消重复请求'); // 执行取消操作
    } else {
      pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
    }
  } else {
    // 如果不存在在请求队列中，加入队列
    // eslint-disable-next-line no-lonely-if
    if (f) {
      pending.push(flagUrl);
    }
  }
};
/* 创建axios实例 */
const service = axios.create({
  timeout: 10000, // 请求超时时间
  baseURL: BASE_URL,
});

/* request拦截器 */
service.interceptors.request.use((config: any) => {
  // neverCancel 配置项，允许多个请求
  if (!config.neverCancel) {
    // 生成cancelToken
    // eslint-disable-next-line no-param-reassign
    config.cancelToken = new CancelToken((c: any) => {
      removePending(config, c);
    });
  }

  return config;
}, (error: any) => {
  Promise.reject(error);
});

/* respone拦截器 */
service.interceptors.response.use(
  (response: any) => {
    // 移除队列中的该请求，注意这时候没有传第二个参数f
    removePending(response.config);
    return response;
  },
  (error: any) => {
    // 异常处理
    // eslint-disable-next-line no-console
    console.error(error);
    pending = [];
    if (error.message === '取消重复请求') {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

const install = () => {
  Vue.prototype.$http = service;
};

export default { install };
