<template>
  <div class="_item_warp">
      <div class="_item_img">
        <img :src="test2"/>
      </div>
      <HaMarquee class="_item_name" :text="'dsadasdass'"></HaMarquee>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  State, Getter, Action, Mutation, namespace,
} from 'vuex-class';

const test2 = require('../../assets/images/test2.png');

const homeStore = namespace('home');

@Component(
  {
    name: 'HaItem',
  },
)

export default class Hahead extends Vue {
   test2:any = test2

  @Prop({
    type: Function,
    default: undefined,
    required: false,
  }) eventQuestion ?: Function

  @homeStore.State(state => state.info) private info:any
}
</script>
<style lang="scss" scoped>
._item_warp{
  width: 120px;
  margin: 10px;
  ._item_img{
    margin: 0 auto;
    width: 108px;
    height: 109px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("../../assets/images/dialogItemBg.png");
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 80px;
    }
  }
  ._item_name{
    width: 120px;
    font-size: 24px;
    height: 27px;
    line-height: 27px;
    font-family:$font-family;
    font-weight:600;
  }
}
</style>
