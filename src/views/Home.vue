<template>
  <div class="home">
    <div class="lang">{{computedLang}}</div>
    <div>{{computedAccessToken}}</div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class';
import { getLangForTW } from '@/utils/utils';

const homeStore = namespace('home');
// 组件注册
@Component({
  name: 'Home',
})


export default class Home extends Vue {
  // 获取语言
  get computedLang() {
    const lang = this.$route.query.lang || window.sessionStorage.getItem('Lang') || getLangForTW();
    return lang;
  }
  // 获取token

  get computedAccessToken() {
    return this.$route.query.access_token || window.sessionStorage.getItem('AccessToken') || '';
  }
  // 生命周期函数

  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.home{
  height:32px;
  .lang{
    height: 12px;
  }
}
</style>
