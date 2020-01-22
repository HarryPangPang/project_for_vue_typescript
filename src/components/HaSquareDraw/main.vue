<template>
  <!-- 抽奖 -->
  <div class="__draw_warp">
    <div class="__draw __draw_1">
      <div :class="{'__current':current===1}"></div>
    </div>
    <div class="__draw __draw_2">
      <div :class="{'__current':current===2}"></div>
    </div>
    <div class="__draw __draw_3">
      <div :class="{'__current':current===3}"></div>
    </div>
    <div class="__draw __draw_4" >
      <div :class="{'__current':current===4}"></div>
    </div>
    <div class="__draw __draw_5">
      <div :class="{'__current':current===5}"></div>
    </div>
    <div class="__draw __draw_6">
      <div :class="{'__current':current===6}"></div>
    </div>
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
    this.start();

    setTimeout(() => {
      this.catchResult = true;
    }, 3000);
  }
}
</script>
<style lang="scss" scoped>
.__draw_warp{
  position: relative;
  width: 689px;
  height: 560px;
  @include bgc();
  background-image: url('../../assets/images/rightBg.png');
  .__draw{
    position: absolute;
    width: 152px;
    @include bgc();
    background-image: url('../../assets/images/itemBg.png');
    height: 147px;
    &_1{
      top: 71px;
      left: 197px;
    }
    &_2{
      top: 71px;
      left: 352px;
    }
    &_3{
      top: 221px;
      left: 502px;
    }
    &_4{
      top: 364px;
      left: 354px;
    }
    &_5{
      top: 364px;
      left: 197px;
    }
    &_6{
      top: 221px;
      left: 46px;
    }
  }
  .__current{
    position: relative;
    width: 100%;
    height: 100%;
    &::after{
      position: absolute;
      @include bgc();
      content: '';
      width: 100%;
      height: 100%;
      background-image: url('../../assets/images/itemChosen.png');
    }
  }
}
</style>
