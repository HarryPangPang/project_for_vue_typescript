<template>
  <div class="ha-message-warp mask" v-show="visable">
    <div class="ha-message-content center">
      <div class="content">{{ msg }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, PropSync, Watch,
} from 'vue-property-decorator';

@Component
export default class HaMessaeg extends Vue {
  visable: Boolean = false;

  msg: String = '';

  onClose?: Function;

  delay?:number;

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
.ha-message-warp {
  font-family: $font-family;
  color: #fff7e1;
  font-size: 30px;
  font-weight: 600;
  font-style:normal;
  .ha-message-content {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../../../../assets/images/dialogBg.png');
    color: #fff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 821px;
    height: 484px;
    margin-left: -440px;
    margin-top: -242px;

    z-index: 12;
    .content{
      font-size: 30px;
      margin: 40px;
      word-break: break-word;
    }
  }
  .center{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    }
}
</style>
