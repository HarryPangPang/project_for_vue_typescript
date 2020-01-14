<template>
  <div class="ha-toast-warp mask" v-show="visable">
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

  //   @Prop() msg!: String;
  //   @Watch("visable")
  //   onChangeVisable(newValue: Boolean, oldValue:Boolean) {
  //       this.visable = newValue
  //   }
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
  }
}
</style>
