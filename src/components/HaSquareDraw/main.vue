<template>
  <!-- 抽奖 -->
  <div class="__draw_warp">
    <div class="__draw __draw_1">
      <img :src="test2" class="_draw_item"/>
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

    <!-- 抽奖 -->
    <div class="_draw_btn font-3" @click="eventDraw">
      <div class="_draw_content">CHARGE UP</div>
    </div>
    <div class="_draw_cost">
        <i class="_diamond"></i>
        <span class="_cost">8888</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const test2 = require('../../assets/images/test1.png');

@Component({
  name: 'HaSquareDraw',
})
export default class HaSquareDraw extends Vue {
  current:any = 0

  speed:number = 100

  test2 = test2

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

  eventDraw() {
    this.start();
    setTimeout(() => {
      this.catchResult = true;
    }, 3000);
  }

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
  ._draw_btn{
        color: #261c0e;
        font-size: 36px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        @include bgc();
        width: 285px;
        height: 97px;
        background-image: url('../../assets/images/btn2.png');
        top: 216px;
        left: 205px;
        z-index: 3;
        text-align: center;
        ._draw_content{
          margin: 0 auto;
          width: 252px;
          height: 60px;
          line-height: 30px;
          @include ellipsis-line-middle(2,'center');
        }
      }
      ._draw_cost{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        @include bgc();
        width: 285px;
        height: 40px;
        top: 316px;
        left: 205px;
        font-family: $sub-font-family;
        color: #fff;
        ._diamond{
          display: inline-block;
          @include bgc();
          width: 30px;
          height: 26px;
          background-image: url('../../assets/images/diamondIcon.png');
        }
        ._cost{
          display: inline-block;
        }
      }
  .__draw{
    position: absolute;
    width: 152px;
    @include bgc();
    background-image: url('../../assets/images/itemBg.png');
    height: 147px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    ._draw_item{
      width: 66px;
      display: inline-block;
    }
  }
  .__current{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
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
