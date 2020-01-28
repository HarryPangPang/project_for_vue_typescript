/* eslint-disable no-param-reassign */
import { http } from '@/network/http';
import { api } from '@/api/index';
import { HaMessage } from '@/uiFeatures/index';
import ToastLang from '@/constants/lang/en';
import { resortArraryObject, delayTimeOut, getTimeLeft } from '@/utils/utils';

interface infoParams{
  lang:string,
  // eslint-disable-next-line camelcase
  access_token:string
}

const state = {
  info: {
    transify: null,
    left_free_num: 0,
  },
  canClick: true, //  是否可以点击
  repairAnimation: false, // 维修动画开关
  // 倒计时
  countTime: {
    DAYS: 0,
    HOURS: 0,
    MINUTES: 0,
    SECONDS: 0,
  },
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
    if (data.value && data.value.stages) {
      data.value.stages = resortArraryObject(data.value.stages, 'percentage');
    }

    states[data.key] = data.value;
  },
  // 更新免费维修剩余
  updateFreeRepairLeft(states:any) {
    if (states.info && states.info.left_free_num > 0) {
      states.info.left_free_num -= 1;
    }
  },
  // 更新百分比
  updatePercentage(states:any, percentage:number) {
    // states.info.percentage = percentage;
    // test
    states.info.percentage = states.info.percentage + 20;
  },
  // 更新维修动画
  updateRepairAnimation(states:any, status:boolean) {
    states.repairAnimation = status;
  },
  // 更新维修币
  updateRepairToken(states:any) {
    states.info.repair_token -= states.info.repair_cost;
  },
  // 更新时间
  updateTimeLeft(states:any, result: any) {
    states.countTime.DAYS = result.DAYS;
    states.countTime.HOURS = result.HOURS;
    states.countTime.MINUTES = result.MINUTES;
    states.countTime.SECONDS = result.SECONDS;
  },
};

const actions = {
  // 获取活动初始化信息
  getInfo({ commit, dispatch }: any, params: infoParams) {
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
        dispatch('setCountDown');
      }
    }).catch((e) => {
      HandleError(e);
    });
  },

  // 维修动画控制
  repairAnimate({ commit }:any) {
    // 呼吸灯打开和延迟关闭
    commit('updateRepairAnimation', true);
    delayTimeOut(() => {
      commit('updateRepairAnimation', false);
    }, 3600);
  },

  // 维修
  repair({ commit }:any) {
    http.post(api.repair).then((res:any) => {
      if (res && res.error) {
        HandleError(res.error);
      } else {
        if (state.info.left_free_num > 0) {
          commit('updateFreeRepairLeft');
        } else {
          commit('updateRepairToken');
        }
        commit('updatePercentage', res.data.percentage);
      }
    }).catch((e) => {
      HandleError(e);
    });
  },

  // 倒计时
  setCountDown({ commit }:any) {
    setInterval(() => {
      const result = getTimeLeft(1602374400);
      commit('updateTimeLeft', result);
    }, 1000);
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
