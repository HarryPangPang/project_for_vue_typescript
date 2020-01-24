/* eslint-disable no-param-reassign */
import { http } from '@/network/http';
import { api } from '@/api/index';
import { HaMessage } from '@/uiFeatures/index';
import ToastLang from '@/constants/lang/en';
import { resortArraryObject, delayTimeOut } from '@/utils/utils';

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
  canClick: true,
  repairAnimation: false,
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

  updateFreeRepairLeft(states:any) {
    if (states.info && states.info.left_free_num > 0) {
      states.info.left_free_num -= 1;
    }
  },

  updatePercentage(states:any, percentage:number) {
    // states.info.percentage = percentage;
    // test
    states.info.percentage = states.info.percentage + 20;
  },

  updateRepairAnimation(states:any, status:boolean) {
    states.repairAnimation = status;
  },

  updateRepairToken(states:any) {
    states.info.repair_token -= states.info.repair_cost;
  },
  // 更换钻石
  updateRepairCenter(states:any) {
    // const stage1 = states.info.stages[0].percentage;
    // const stage2 = states.info.stages[1].percentage;
    // const stage3 = states.info.stages[2].percentage;
    // const current = states.info.percentage;
    // if(current>0)
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
    console.log(state.info.percentage)
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
        // 呼吸灯打开和延迟关闭
        commit('updateRepairAnimation', true);
        delayTimeOut(() => {
          commit('updateRepairAnimation', false);
        }, 3600);

        // 更换钻石
        delayTimeOut(() => {
          commit('updateRepairCenter');
        }, 3700);
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
