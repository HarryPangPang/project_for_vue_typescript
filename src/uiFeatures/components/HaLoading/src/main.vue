<template>
  <div class="ha-toast-warp mask" v-show="visable">
    <div class="ha-toast-content">
        <i class="ha-loading"></i>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, PropSync, Watch,
} from 'vue-property-decorator';

@Component
export default class HaLoading extends Vue {
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
    .ha-loading{
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 20vh;
      height: 20vh;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -10vh;
      margin-top: -10vh;
      z-index: 999;
      background-image: url("../../../../assets/images/loading.svg");
    }
  }
}
</style>
