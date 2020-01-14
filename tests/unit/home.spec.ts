import { shallowMount } from '@vue/test-utils';
import Home from '../../src/views/Home.vue';
/* eslint-disable  */
const factory = (values = {}) => {
  return shallowMount(Home, {
    data () {
      return {
        ...values
      }
    }
  })
}

describe('Home.vue', () => {
  it('渲染首页获取值', () => {
    const wrapper = factory({title:'test1'})
    expect(wrapper.text()).toMatch('');
  });
});
