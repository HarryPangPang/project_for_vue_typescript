<template>
  <div class="mask" v-show="visable">
    <div class="dialog outter-dialog common-dialog fadeInUp animated ">
      <div class="warp">
        <div class="close">
          <i
            @click="close"
            class="icon-cross"
          >X</i>
        </div>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, PropSync, Watch, Emit,
} from 'vue-property-decorator';

@Component({
  name: 'HaMessage',
})
export default class HaMessage extends Vue {
    @PropSync('visable', {
      type: Boolean,
      default: false,
      required: true,
    }) syncedVisable !: Boolean

    @Prop({
      type: Function,
      default: undefined,
      required: false,
    }) beforeClose ?: Function

     @Prop({
       type: Function,
       default: undefined,
       required: false,
     }) afterClose ?: Function

     hide() {
       this.syncedVisable = false;
     }

     close(): void {
       if (this.beforeClose && typeof this.beforeClose === 'function') {
         this.beforeClose(this);
         return;
       }
       this.hide();
       if (this.afterClose && typeof this.afterClose === 'function') {
         this.afterClose(this);
       }
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.warp {
  max-height: 80%;
  position: relative;
  color: #fff;
  background-color: #fff;
  .close {
    .icon-cross {
      position: absolute;
      z-index: 2;
      top: 0;
      background-repeat: no-repeat;
        left: -90px;
        width: 65px;
        height: 65px;
        background-size: 65px;
    }
  }
   .can-scoll-y{
      width: 100%;
      height: 100%;
      word-break: break-word;
      overflow-x: hidden;
      overflow-y: auto;
    }
  .content {
    background-repeat: no-repeat;
    position: relative;
    background-size: 100% 100%;
      padding:45px;
      font-size:26px;
      width: 895px;
      height: 530px;
  }
}
</style>
