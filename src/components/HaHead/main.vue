<template>
  <div class="_header_warp font-1" v-if="info&&info.uid">
    <div class="_head_left">uid:{{info.uid}}</div>
    <div class="_head_title">
      <span class="_head_text font-2">Black Friday Sales</span>
    </div>
    <div class="_head_right">
      <div class="_head_label">
        <i class="_doller1"></i>
        <span>{{info.repair_token}}</span>
      </div>
      <div class="_head_label">
        <i class="_doller1"></i>
        <span>{{info.draw_token}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  State, Getter, Action, Mutation, namespace,
} from 'vuex-class';

const homeStore = namespace('home');

@Component(
  {
    name: 'Hahead',
  },
)

export default class Hahead extends Vue {
  @homeStore.State(state => state.info) private info:any
}
</script>
<style lang="scss" scoped>
._header_warp{

  // display: flex;
  // flex-wrap: nowrap;
  // justify-content: space-between;
  height: 100px;
  font-family: $font-family;
  ._head_left{
    height: 100px;
    line-height: 76px;
    font-size: 24px;
    color: #debe97;
    position: absolute;
    left: 30px;
    top: 0;
  }
  ._head_title{
    font-size: 60px;
    color: #ebd5ba;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center;
        background-size: 100% 100%;
        background-image: url('../../assets/images/titleBg.png');
      width: 800px;
      height: 100px;
      line-height: 76px;
      text-align: center;
    ._head_text{
      position: relative;
      &::after{
        width: 51px;
        height: 51px;
        content: '';
        position: absolute;
        right: -60px;
        top: 50%;
        margin-top: -20px;
        background-repeat: no-repeat;
        background-size: 100%;
        background-image: url('../../assets/images/question.png')
      }
    }
  }
  ._head_right{
    height: 100px;
    line-height: 76px;
    display: inline-flex;
    justify-content: space-between;
    font-size: 36px;
    position: absolute;
    right: 0;
    top: 0;
    ._head_label{
      padding-left: 38px;
      padding-right: 50px;
    }
    ._doller1{
      position: relative;
      &::after{
        width: 36px;
        height: 36px;
        content: '';
        top: 50%;
        margin-top: -18px;
        left: -38px;
        position: absolute;
         background-repeat: no-repeat;
        background-size: 100%;
        background-image: url('../../assets/images/question.png')
      }
    }
     ._doller2{
      position: relative;
      &::after{
        width: 36px;
        height: 36px;
        content: '';
        top: 50%;
        margin-top: -18px;
        left: -38px;
        position: absolute;
         background-repeat: no-repeat;
        background-size: 100%;
        background-image: url('../../assets/images/question.png')
      }
    }
  }
}
</style>
