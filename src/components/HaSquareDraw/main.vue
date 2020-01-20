<template>
  <!-- 抽奖 -->
  <div class="__draw_warp">
    <div class="__draw __drwa_1" :class="{'__current':current===1}"></div>
    <div class="__draw __drwa_2" :class="{'__current':current===2}"></div>
    <div class="__draw __drwa_3" :class="{'__current':current===3}"></div>
    <div class="__draw __drwa_4" :class="{'__current':current===4}"></div>
    <div class="__draw __drwa_5" :class="{'__current':current===5}"></div>
    <div class="__draw __drwa_6" :class="{'__current':current===6}"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'HaSquareDraw',
})
export default class HaSquareDraw extends Vue {
  current:any = 0

  speed:number = 100

  catchResult:any = false

  originAwards:object[] = [{
    name: 1,
  }, {
    name: 2,
  }, {
    name: 3,
  }, {
    name: 4,
  }, {
    name: 5,
  }, {
    name: 6,
  }]

  receivedAwards:object[] =[] // 已抽中

  private rollingStatus:boolean = false // 转动状态

  private timer1:any // 定时器

  private timer2:any // 定时器

  startRoll() {
    this.timer1 = setInterval(() => {
      this.current += 1;
      if (this.current > 6) {
        this.current = 1;
      }
    }, this.speed);
  }

  start() {
    this.timer2 = setInterval(() => {
      this.stopRoll();
      if (this.catchResult) {
        this.speed += 100;
        if (this.speed > 500) {
          if (this.current === 4) {
            this.current = 4;
            this.stopRoll();
            this.stop();
            return;
          }
        }
      }
      this.startRoll();
    }, 500);
  }

  stopRoll() {
    clearInterval(this.timer1);
  }

  stop() {
    clearInterval(this.timer2);
  }

  created() {
    // this.start();

    // setTimeout(() => {
    //   this.catchResult = true;
    // }, 3000);
  }
}
</script>
<style lang="scss" scoped>
.__draw_warp{
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: 210px;
  height: 300px;
  .__draw{
    margin: 10px;
    background-color: #fff;
    width: 80px;
    height: 80px;
  }
  .__current{
    background-color: rgb(78, 13, 13);
  }
}
</style>
