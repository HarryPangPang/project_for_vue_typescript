<template>
  <div id="home-lang" class="home" :data-lang="computedLang">
    <!-- 头部 -->
    <Ha-header></Ha-header>
    <!-- 左侧 -->
    <div class="__left" v-visibility="false">
      <Ha-process></Ha-process>
    </div>
    <!-- 右侧 -->
    <div class="__right" >
      <HaSquareDraw ref="draw"></HaSquareDraw>
      <!-- 倒计时 -->
      <div class="time">
        <div class="timeleft">
          <div class="timeing" v-html="renderTimeLeft"></div>
        </div>
      </div>
      <HaMarquee :text="'dasdasdasdasdasdasdasdasdasdasdasdas'"></HaMarquee>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  State, Getter, Action, Mutation, namespace,
} from 'vuex-class';
import HaHeader from '@/components/HaHeader/main.vue';
import HaProcess from '@/components/HaProcess/main.vue';
import HaSquareDraw from '@/components/HaSquareDraw/main.vue';

import { getLangForTW, getTimeLeft } from '@/utils/utils';

const homeStore = namespace('home');
// 组件注册
@Component({
  name: 'Home',
  components: {
    HaHeader,
    HaProcess,
    HaSquareDraw,
  },
})
export default class Home extends Vue {
  transify: any;

  countTime = {
    DAYS: 0,
    HOURS: 0,
    MINUTES: 0,
    SECONDS: 0,
  };

  // 获取语言
  get computedLang() {
    const lang = this.$route.query.lang || window.sessionStorage.getItem('Lang') || getLangForTW();
    return lang;
  }
  // 获取token

  get computedAccessToken() {
    return this.$route.query.access_token || window.sessionStorage.getItem('AccessToken') || '';
  }

  get renderTimeLeft() {
    let final = 'DAY:{{day}} HOUR:{{hour}}';
    final = final.replace('{{day}}', `<span class="day">${this.countTime.DAYS}</span>`);
    final = final.replace(
      '{{hour}}',
      ` <span class="hour">${this.countTime.HOURS}</span>
        :
        <span class="minit">${this.countTime.MINUTES}</span>
        :
        <span class="second">${this.countTime.SECONDS}</span>`,
    );
    final = final.replace('(GMT+8)', '');
    return final;
  }

  setCountDown() {
    setInterval(() => {
      const result = getTimeLeft(1602374400);
      this.countTime.DAYS = result.DAYS;
      this.countTime.HOURS = result.HOURS;
      this.countTime.MINUTES = result.MINUTES;
      this.countTime.SECONDS = result.SECONDS;
    }, 1000);
  }

  // 生命周期函数

  created() {
    // this.$refs.draw.startRoll()
    this.setCountDown();
    this.$http
      .get(this.$api.userinfo, { lang: this.computedLang, access_token: this.computedAccessToken })
      .then((res) => {
        console.log(res);
      })
      .catch((e: any) => {
        console.warn(e);
      });
  }
}
</script>
<style lang="scss" scoped>

.home {
  .__left{
    float: left;
  }
  .__right{
    float: right;
  }
}
</style>
