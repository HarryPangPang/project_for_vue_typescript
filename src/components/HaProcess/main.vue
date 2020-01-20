<template>
  <div class="__process_warp">
    <div class="__process"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component(
  {
    name: 'HaProcess',
  },
)

export default class HaProcess extends Vue {
  processInit() {
    this.processCtrl(20);
  }

  processCtrl(height:number | string) {
    this.$anime({
      targets: '.__process',
      height: `${height.toString()}%`,
      easing: 'easeInOutQuad',
      direction: 'normal',
      loop: false,
    });
  }

  mounted() {
    this.processInit();
    setTimeout(() => {
      this.processCtrl(80);
    }, 2000);
    // this.$anime({
    //   targets: '.__process_1',
    //   height: '10%', // -> from '28px' to '100%',
    //   easing: 'easeInOutQuad',
    //   direction: 'alternate',
    //   loop: true,
    // });
  }
}
</script>
<style lang="scss" scoped>
.__process_warp{
    background-color: #fff;
    height: 500px;
    width: 40px;
    position: relative;
    .__process{
        position: absolute;
        height: 0%;
        width: 100%;
        left: 0;
        bottom: 0;
        background-color: red;
    }
}
</style>
