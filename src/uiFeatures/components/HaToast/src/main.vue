<template>
  <div class="ha-toast-warp ha-mask" v-show="visable">
    <div class="ha-toast-content">
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, PropSync, Watch,
} from 'vue-property-decorator';

@Component
export default class HaToast extends Vue {
  visable: Boolean = false;

  msg: String = '';

  onClose?: Function;

  close(): void {
    this.visable = false;
    if (this.onClose && typeof this.onClose === 'function') {
      this.onClose(this);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes mask_slip_in{
  from{
    opacity: 0;
  }
  to{
    opacity: 0.8;
  }
}
.ha-toast-warp {
  font-family: $font-family;
  .ha-toast-content {
    color: #fff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    @include res-size(
      $width:880px,
      $height:70px,
      $line-height:70px,
      $margin-left:-440px
    );
    @include res-size($font-size: 30px);
    z-index: 12;
  }
}
.ha-mask {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background-color: #000;
  animation:mask_slip_in 50ms ease-in-out forwards;
  z-index: 100;
}
</style>
