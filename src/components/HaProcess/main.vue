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

@Component(
  {
    name: 'HaProcess',
  },
)

export default class HaProcess extends Vue {
  @Prop() percent!:number

  get processCalc() {
    this.$nextTick(() => {
      this.processCtrl(this.percent);
    });
    return '';
  }

  processCtrl(height:number) {
    this.$anime({
      targets: '.__process_black',
      height: `${(100 - height).toString()}%`,
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
