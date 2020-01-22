import { http } from '@/network/http';
import { api } from '@/api/index';
import { HaMessage } from '@/uiFeatures/index';
import ToastLang from '@/constants/lang/en';
import { resortArraryObject } from '@/utils/utils';

interface infoParams{
  lang:string,
  // eslint-disable-next-line camelcase
  access_token:string
}

const state = {
  info: {
    transify: null,
  },
  canClick: true,
  percentage: 0
};
// 错误处理
const HandleError = (error:any, delay?:number) => {
  let transify;
  let err;
  if (state && state.info && state.info.transify) {
    // eslint-disable-next-line prefer-destructuring
    transify = state.info.transify;
    if (typeof (error) === 'string') {
      if (transify && transify[error]) {
        err = transify[error];
      }
    }
    if (error && error.msg && typeof (error.msg) === 'string') {
      if (transify && transify[error.msg]) {
        err = transify[error.msg];
      }
    }
    if (error && error.error && typeof (error.error) === 'string') {
      if (transify && transify[error.error]) {
        err = transify[error.error];
      }
    }
  }
  HaMessage({
    msg: err || ToastLang.TOAST_NETWORK_ERROR,
    visable: true,
    delay,
  });
};


const mutations = {
  setValue(states:any, data:any) {
    // eslint-disable-next-line no-param-reassign
    if (data.value && data.value.stages) {
      // eslint-disable-next-line no-param-reassign
      data.value.stages = resortArraryObject(data.value.stages, 'percentage');
    }
    // eslint-disable-next-line no-param-reassign
    states[data.key] = data.value;
  },

  updateFreeRepairLeft(states:any) {
    if (states.info && states.info.left_free_num > 0) {
      // eslint-disable-next-line no-param-reassign
      states.info.left_free_num -= 1;
    }
  },

  updatePercentage(states:any, percentage:number) {
    // eslint-disable-next-line no-param-reassign
    states.percentage = percentage;
  },
};

const actions = {
  // 获取活动初始化信息
  getInfo({ commit }: any, params: infoParams) {
    http.get(api.info, { params }).then((res:any) => {
      if (res && res.error) {
        HandleError(res.error);
      } else {
        commit('setValue', {
          key: 'info',
          value: res.data,
        });
        commit('setValue', {
          key: 'inpercentagefo',
          value: res.data.percentage,
        });
      }
    }).catch((e) => {
      HandleError(e);
    });
  },

  // 维修
  repair({ commit }:any) {
    http.post(api.repair).then((res:any) => {
      if (res && res.error) {
        HandleError(res.error);
      } else {
        commit('updateFreeRepairLeft');
        commit('updatePercentage', res.data.percentage);
      }
    }).catch((e) => {
      HandleError(e);
    });
  },

  // updateUsername({ commit }: any, data: any) {
  //   commit('setValue', {
  //     key: 'username',
  //     value: data,
  //   });
  // },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
