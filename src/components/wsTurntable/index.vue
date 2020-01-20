<template>
  <div class="turntable-warp">
   
    <!-- 背景 -->
    <div class="main" :style="{ transform: 'rotate(' + deg + 'deg)' }">
      <div  class="turntable" :style="customImgUrl('turntable')">
         
      </div>
     <div v-show="special" class="turntable-shine" :style="customImgUrl('shine')"></div>
       <!-- 奖池物品 -->
    <div class="turntable-item-bg">
      <div class="turntable-item-position">
        <div
          class="turntable-item"
          v-for="(item,index) in turntableItems"
          :key="index"
          :class="'pos_' + item.position"
        >
          <img :src="item.item_img" />
          <span class="num" v-if="item.item_num > 1">X {{ item.item_num }}</span>
        </div>
      </div>
    </div>
    </div>
    <!--指针 -->
    <div class="center">
      <div style="position:reeative;">
              <div class="point" :style="customImgUrl('turntableSelected')"></div>
      <div class="chosen" v-show="chosenShow" :style="customImgUrl('turntableChecked')"></div>

      </div>
    </div>
  </div>
</template>

<script>
import { imageMixin } from "@/mixins";
export default {
  name: "turntable",
  mixins: [imageMixin],
  props: {
    turntableItems:{
      type:Array,
      required:true,
      default:[]
    },
    special:{
      type:Boolean,
      required:true,
      default:false
    },
  },
  data() {
    return {
      myItems: [],
      deg: 0,
      running: 0,
      stopPos: 0,
      chosenShow:false,
    };
  },
  methods: {
    forceStopRoating(){
      clearInterval(this.running);
      this.running=null
    },
    startRotating() {
      this.chosenShow = false
      var _this = this;
      if (_this.running) {
        clearInterval(_this.running);
      }
      this.running = setInterval(function() {
        var num = (parseInt(_this.deg) + 36) % 360;
        _this.deg = num;
        // console.log('12')
      }, 60);
    },
    setStopAt(num) {
      this.stopPos = num;
    },
    directStopAt(num) {
      this.stopPos = num;
      this.deg = 360 - this.stopPos * 36 + 18
      this.chosenShow = true
    },
    stopRotating() {
      if (this.stopPos) {
        this.deg = 360 - this.stopPos * 36 + 18
      }
       this.chosenShow = true
      clearInterval(this.running);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.turntable-warp {
  position: relative;
  font-family: 'Teko-Regular';
  .turntable-item-bg {
    position: absolute;
    left: 0;
    top: 0;
    background-repeat: no-repeat;
    @include res-size($width: 563px, $height: 563px, $background-size: 563px);
    .turntable-item-position {
      position: relative;
      width: 100%;
      height: 100%;
      .turntable-item {
        position: absolute;
        z-index: 1;
        @include res-size(
            $height:68px,
          );
          @include res-size(
            $width:68px,
          );
        // @include res-size($width: 563px, $height: 563px)
        img{
          @include res-size(
            $height:68px,
          );
        }
        .num{
          color: #fff;
          position: absolute;
           @include res-size(
            $font-size:16px
          );
          right:0;
          bottom: 0;
        }
      }
      .pos_1{
        transform: rotate(15deg);
        @include res-size($left: 295px, $top: 85px);
      }
      .pos_2{
         transform: rotate(45deg);
        @include res-size($left: 390px, $top: 145px);
      }
      .pos_3{
         transform: rotate(90deg);
        @include res-size($left: 415px, $top: 247px);
      }
      .pos_4{
        transform: rotate(128deg);
        @include res-size($left: 383px, $top: 343px);
      }
      .pos_5{
        transform: rotate(170deg);
        @include res-size($left: 300px, $top: 410px);
      }
      .pos_6{
        transform: rotate(195deg);
        @include res-size($left: 191px, $top: 410px);
      }
      .pos_7{
        transform: rotate(240deg);
        @include res-size($left: 108px, $top: 346px);
      }
      .pos_8{
        transform: rotate(270deg);
        @include res-size($left: 80px, $top: 245px);
      }
      .pos_9{
        transform: rotate(300deg);
        @include res-size($left: 108px, $top: 148px);
      }
      .pos_10{
        transform: rotate(335deg);
        @include res-size($left: 195px, $top: 90px);
      }
    }
  }
  .main {
    position: relative;
    .turntable {
      z-index: 1;
      // background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      @include res-size($width: 563px, $height: 563px, $background-size: 563px);
      //   .center-pos {
      //     position: relative;
      //     .point-warp {
      //       position: absolute;
      //       top: 0;
      //       left: 0;
      //     }
      //   }
      //   .point {
      //     background-repeat: no-repeat;
      //     @include res-size($width: 84px, $height: 64px, $background-size: 84px);
      //   }
    }
    .turntable-shine{
       position: absolute;
      @include res-size($left:-43px,$top:-46px,$width: 643px, $height: 643px, $background-size: 643px);
    }
  }

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    @include res-size($margin-left: -65px, $margin-top: -133px);
    // @include px2res(-moz-transform-origin, 220px, 189px);
    // @include px2res(-webkit-transform-origin, 220px, 189px);
    // @include px2res(-o-transform-origin, 220px, 189px);
    // @include res-size($margin-left: -220px, $margin-top: -188px);
    // transform: rotate(55deg);
     .chosen{
       z-index: 0;
        position: absolute;
        background-repeat: no-repeat;
        transform: rotate(54deg);
        @include res-size($left:-36px,$top:-100px,$width: 220px, $height: 190px, $background-size: 220px);
      }
    .point {
      background-repeat: no-repeat;
      position: relative;
      z-index: 1;
      @include res-size($width: 130px, $height: 196px, $background-size: 130px);
      // position: absolute;
      // background-repeat: no-repeat;
      // top: 50%;
      // left: 50%;
      // @include res-size(
      //   $width: 130px,
      //   $height: 130px,
      //   $background-size: 130px,
      //   $margin-left: -65px,
      //   $margin-top: -65px
      // );
    }
  }
}
</style>
