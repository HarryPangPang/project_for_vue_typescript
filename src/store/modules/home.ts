import http from '@/network/http';

const state = {
  username: 'haha',
};
const mutations = {
  setValue(states:any, data:any) {
    // eslint-disable-next-line no-param-reassign
    states[data.key] = data.value;
  },
};

const actions = {
  updateUsername({ commit }: any, data: any) {
    commit('setValue', {
      key: 'username',
      value: data,
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
