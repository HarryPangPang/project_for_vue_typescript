<template>
  <div id="home-lang" class="home" :data-lang="computedLang" v-if="info">
    <!-- 头部 -->
    <HaHead></HaHead>
    <div class="main">
      <!-- 左侧 -->
    <div class="__left">
      <!-- 进度条 -->
     <div class="_process_warp">
       <Ha-process :percent='info.percentage' v-if="computedStages&&computedStages.length>0">
         <template slot="content">
           <!-- 百分比 -->
           <div class="_process_percent font-1">
           <div class="_percent_1">{{computedStages[0]['percentage']}}%</div>
           <div class="_percent_2">{{computedStages[1]['percentage']}}%</div>
           <div class="_percent_3">{{computedStages[2]['percentage']}}%</div>
         </div>
         <!-- 进度条物品 -->
         <div class="_process_item_warp">

           <div class="_process_item">
            <img :src="test2"/>
            <HaMarquee class="_item_name font-3" :text="'物品名称'"></HaMarquee>
          </div>

          <div class="_process_item _process_item2 _process_item_can">
           <img :src="test2"/>
            <HaMarquee class="_item_name font-3" :text="32131233123"></HaMarquee>
          </div>

          <div class="_process_item _process_item3 _process_item_ed">
           <img :src="test2"/>
           <HaMarquee class="_item_name font-3" :text="'大蒜大蒜'"></HaMarquee>
          </div>

         </div>
         </template>
       </Ha-process>
     </div>
      <!-- 维修物件 -->
      <div class="_repair_warp">
        <div class="_repair_main">
          <div class="_repair_1"></div>
          <div :class="[
          {'_repair_center' : ComputedPercentage> 0},
          {'_repair_center2':ComputedPercentage===2},
          {'_repair_center3':ComputedPercentage===3}]"></div>
          <div class="_repair_2"></div>
          <div class="_repair_light "></div>
          <div class="_repair_breathe breathe" v-show="repairAnimation"></div>
        </div>
        <!-- 抽奖 -->
        <div class="_reparir_btn font-3" @click="eventRepair">
          <div class="_repair_content">CHARGE UP</div>
        </div>
        <div class="_repair_cost">
          <i class="_diamond"></i>
          <span class="_cost">{{info.left_free_num>0 ? 'free' : info.repair_cost}}</span>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="__right" >
      <HaSquareDraw v-if="eventOpen" ref="draw"></HaSquareDraw>
      <!-- 倒计时 -->
      <div class="_time_left" v-else>
        <div class="_timer font-2">
          <div class="_day">
              {{countTime.DAYS}}
            <div class="_label">Days</div>
          </div>
          <div class="_day">
              {{countTime.HOURS}}
            <div class="_label">Hours</div>
          </div>
          <div class="_day">
              {{countTime.MINUTES}}
            <div class="_label">MINUTES</div>
          </div>
          <div class="_day">
              {{countTime.SECONDS}}
            <div class="_label">seconds</div>
          </div>
        </div>
        <div class="_timer_label">"*THIS MODULE WILL VALID AFTER JAN 31ST"</div>
      </div>
      <!-- <HaMarquee  :text="text"></HaMarquee> -->
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
  State, Getter, Action, Mutation, namespace,
} from 'vuex-class';
import HaHead from '@/components/HaHead/main.vue';
import HaProcess from '@/components/HaProcess/main.vue';
import HaSquareDraw from '@/components/HaSquareDraw/main.vue';
import { getLangForTW, getTimeLeft } from '@/utils/utils';

const test2 = require('../assets/images/test2.png');

const homeStore = namespace('home');
// 组件注册
@Component({
  name: 'Home',
  components: {
    HaHead,
    HaProcess,
    HaSquareDraw,
  },
})
export default class Home extends Vue {
  transify: any;

  text:string = '12345'

  eventOpen:boolean = true

  test2:any = test2

  countTime = {
    DAYS: 0,
    HOURS: 0,
    MINUTES: 0,
    SECONDS: 0,
  };

  percentage:number = 0

  percentChanged:boolean = false

  @homeStore.State(state => state.info) private info:any

  @homeStore.State(state => state.repairAnimation) private repairAnimation:any

  @homeStore.Action('getInfo') private getInfo!:Function

  @homeStore.Action('repair') private repair!:Function

  get ComputedPercentage() {
    if (this.info && this.info.percentage > 0) {
      const x1 = this.info.stages[0].percentage;
      const x2 = this.info.stages[1].percentage;
      const x3 = this.info.stages[2].percentage;
      const percent = this.info.percentage;
      if (percent > 0 && (percent < x1)) {
        return 0;
      }
      if ((percent > x1 || percent === x1) && (percent < x2)) {
        return 1;
      }
      if ((percent > x2 || percent === x2) && (percent < x3)) {
        return 2;
      }
      if (percent > x3 || percent === x3) {
        return 3;
      }
      return -1;
    }
    return -1;
  }

  @Watch('percentage')
  onPercentageChange(oldVal:number, newVal: number) {
    if(oldVal<newVal){
      
    }
  }

  // 获取语言
  get computedLang() {
    const lang = this.$route.query.lang || window.sessionStorage.getItem('Lang') || getLangForTW();
    return lang;
  }

  // 获取token
  get computedAccessToken() {
    return this.$route.query.access_token || window.sessionStorage.getItem('AccessToken') || '';
  }

  // 获取阶段
  get computedStages() {
    if (this.info && this.info.stages && this.info.stages.length > 0) {
      return this.info.stages;
    }
    return [];
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

  eventRepair() {
    this.repair();
  }

  // 生命周期函数

  created() {
    this.getInfo({
      lang: this.computedLang,
      access_token: this.computedAccessToken,
    });
    this.setCountDown();
  }
}
</script>
<style lang="scss" scoped>

.home {
  @include bgc();
  height: 100%;
  width: 100%;
  background-image: url('../assets/images/bg.png');
  .main{
        display: flex;
    justify-content: space-around;
    margin-top: 50px;
  }
  .__left{
    // float: left;
    display: flex;
    justify-content: space-between;
    ._process_warp{
      padding-left: 63px;
      padding-right: 146px;
      ._process_percent{
        color: #ffd200;
        font-size: 25px;
        ._percent_1{
          position: absolute;
          left: -50px;
          top:calc(66% - 10px);
        }
        ._percent_2{
          position: absolute;
          left: -50px;
          top:calc(33% - 10px);
        }
        ._percent_3{
          position: absolute;
        left: -50px;
        top: calc(0% - 10px);
        }
      }
      ._process_item_warp{
        color: #ffffff;
        font-size: 20px;
      }
      ._process_item{
       position: absolute;
        left: 32px;
        top: calc(0% - 25px);
        width: 131px;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        @include bgc();
         background-image: url('../assets/images/redeemBg1.png');
         img{
           width: 70px;
           margin-left: 20px;
         }
         ._item_name{
           text-align: center;
           font-size: 20px;
           position: absolute;
           left: 20px;
           bottom:-30px;
           width: 110px;
           height: 30px;
         }
      }
      ._process_item2{
        top: calc(33% - 26px);
      }
      ._process_item3{
        top: calc(66% - 27px);
      }

      ._process_item_can{
        background-image: url('../assets/images/redeemBg2.png');
      }
      ._process_item_ed{
        background-image: url('../assets/images/redeemBg3.png');
      }
    }
    ._repair_warp{
      width: 368px;
      height: 499px;
      position: relative;
      ._reparir_btn{
        color: #261c0e;
        font-size: 36px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        @include bgc();
        width: 285px;
        height: 97px;
        background-image: url('../assets/images/btn.png');
        left: 40px;
        bottom: -15px;
        z-index: 3;
        text-align: center;
        ._repair_content{
          margin: 0 auto;
          width: 252px;
          height: 60px;
          line-height: 30px;
          @include ellipsis-line-middle(2,'center');
        }
      }
      ._repair_cost{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        @include bgc();
        width: 285px;
        height: 40px;
        left: 40px;
        bottom: -50px;
        font-family: $sub-font-family;
        color: #fff;
        ._diamond{
          display: inline-block;
          @include bgc();
          width: 30px;
          height: 26px;
          background-image: url('../assets/images/diamondIcon.png');
        }
        ._cost{
          display: inline-block;
        }
      }
      ._repair_main{
        position: relative;
        width: 100%;
        height: 100%;
        ._repair_1{
           @include bgc();
           width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 3;
           background-image: url('../assets/images/stuff1.png');
        }
        ._repair_center{
           position: absolute;
          left: 154px;
          top: 160px;
           @include bgc();
           z-index: 2;
           width: 70px;
           height: 73px;
           background-image: url('../assets/images/stuffCenter1.png');
        }
        ._repair_center2{
           width: 187px;
           height: 202px;
            left: 96px;
            top: 94px;
          background-image: url('../assets/images/stuffCenter2.png');
        }

        ._repair_center3{
           width: 188px;
           left: 96px;
            top: 64px;
           height: 255px;
          background-image: url('../assets/images/stuffCenter3.png');
        }

        ._repair_2{
           position: absolute;
          left: 96px;
          top: 86px;
           @include bgc();
           background-image: url('../assets/images/stuff2.png');
           width: 188px;
            height: 234px;
            z-index: 1;
        }
        ._repair_breathe{
          @include bgc();
          position: absolute;
          left: 26px;
          top: 16px;
          width: 320px;
           height: 357px;
           z-index: 4;
           background-image: url('../assets/images/breatheLight.png');
        }
      }
    }
  }
  .__right{
    // float: right;
    margin-right: 15px;
    ._time_left{
      position: relative;
      width: 689px;
      height: 560px;
      @include bgc();
      background-image: url('../assets/images/rightClose.png');
      ._timer{
        display: flex;
        justify-content: space-between;
        position: absolute;
        left:47px;
        bottom: 77px;
        width: 596px;
        height: 100px;
        background-color: rgba(0,0,0,0.83);
        color: #ffd200;
        font-size: 80px;
        ._day{
          position: relative;
          width: 136px;
          line-height: 72px;
          height: 100px;
          text-align: center;
        }
        ._label{
          position: absolute;
          width: 136px;
          left: 0;
          bottom: -14px;
          text-align: center;
          font-family: $font-family;
          font-size: 20px;
          color: #ffffff;
        }
      }
      ._timer_label{
        text-align: center;
        font-size: 20px;
        color: #ffd200;
        width: 480px;
        height: 40px;
        line-height: 20px;
        @include ellipsis-line-middle(2,'center');
        font-family: $font-family;
        position: absolute;
        bottom: 40px;
        left: 50%;
        margin-left: -240px;
      }
    }
  }
}
</style>
