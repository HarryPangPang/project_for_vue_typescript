<template>
  <div class="ha-toast-warp mask" v-show="visable">
    <div class="ha-toast-content">
      {{ msg }}
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

  delay?:number;

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

  mounted() {
    if (this.delay && this.delay > 0 && this.visable) {
      const timer = setTimeout(() => {
        this.visable = false;
        clearTimeout(timer);
      }, this.delay);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ha-toast-warp {
  font-family: $font-family;
  .ha-toast-content {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../../../../assets/images/toastBg.png');
    color: #fff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 880px;
    height: 70px;
    @include ellipsis-line-middle(2,'center');
    line-height: 30px;
    margin-left: -440px;
    font-size: 30px;
    z-index: 12;
  }
}
</style>
