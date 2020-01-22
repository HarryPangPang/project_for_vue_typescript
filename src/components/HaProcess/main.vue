<template>
  <div class="__process_warp">
    {{processCalc}}
    <div class="__process"></div>
    <div class="__process_black"></div>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  State, Getter, Action, Mutation, namespace,
} from 'vuex-class';

const homeStore = namespace('home');
@Component(
  {
    name: 'HaProcess',
  },
)

export default class HaProcess extends Vue {
  @homeStore.State(state => state.info) private info:any

  @Prop() percent!:number

  get processCalc() {
    this.$nextTick(() => {
      this.processCtrl(100 - this.getPercent - 2);
    });
    return '';
  }

  get getPercent() {
    const x1 = this.info.stages[0].percentage;
    const x2 = this.info.stages[1].percentage;
    const x3 = this.info.stages[2].percentage;
    const a = ((this.percent - 0) / x1) * 33;
    const b = ((this.percent - x1) / (x2 - x1)) * 33;
    const c = ((this.percent - x2) / (x3 - x2)) * 34;
    if (this.info && this.info.stages) {
      if (this.percent > 0 && (this.percent < x1 || this.percent === x1)) {
        return a;
      }
      if (this.percent > 0 && (this.percent < x2 || this.percent === x2)) {
        return 33 + b;
      }
      if (this.percent > 0 && (this.percent < x3 || this.percent === x3)) {
        return 66 + c;
      }
    }
    return 0;
  }

  processCtrl(height:number) {
    this.$anime({
      targets: '.__process_black',
      height: `${(height).toString()}%`,
      easing: 'easeInOutQuad',
      direction: 'normal',
      loop: false,
    });
  }
}
</script>
<style lang="scss" scoped>
.__process_warp{
    height: 544px;
    width: 33px;
    @include bgc();
    position: relative;
    background-image: url('../../assets/images/processbg.png');
    .__process_black{
      max-height: calc(100% - 6px);
      height:100%;
      width: 23px;
      position: absolute;
      left: 4px;
      top: 5px;
      background-color: #000;
      z-index: 2;
    }
    .__process{
        position: absolute;
        height: 536px;
        width: 100%;
        left: 0;
        bottom: 3px;
        @include bgc();
        z-index:1;
        background-image: url('../../assets/images/process.png');
    }
}
</style>
