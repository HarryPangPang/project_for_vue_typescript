<template>
  <div v-show="visable">
    <div class="dialog outter-dialog common-dialog fadeInUp animated ">
        <div class="dialog-content">
          <i @click="close" class="icon-cross"></i>
          <div class="dialog-title font-3">{{title}}</div>
          <div class="content">
            <slot name="content"></slot>
          </div>
        </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, PropSync, Watch, Emit,
} from 'vue-property-decorator';

@Component({
  name: 'HaDialog',
})
export default class HaDialog extends Vue {
    @PropSync('visable', {
      type: Boolean,
      default: false,
      required: true,
    }) syncedVisable !: Boolean

    @Prop({
      type: String,
      default: null,
      required: false,
    }) title?: String

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
    .icon-cross {
      position: absolute;
      z-index: 13;
      top: 24px;
      left: 34px;
      width: 82px;
      height: 82px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('../../../../assets/images/dialogClose.png');
    }
   .can-scoll-y{
      width: 100%;
      height: 100%;
      word-break: break-word;
      overflow-x: hidden;
      overflow-y: auto;
    }
  .dialog-content {
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
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .dialog-title{
      position: absolute;
      top: 14px;
      left: 0;
      width: 770px;
      padding-left: 35px;
      height: 78px;
      line-height: 78px;
      color: #fbfeff;
      font-size: 55px;
      text-shadow: 2px 3px 0px #ae760b,-7px 8px 0px rgba(12, 9, 13, 0.43);
    }
    .content{
      overflow-y: auto;
      overflow-x: hidden;
      font-family: $font-family;
      font-size: 30px;
      margin: 40px;
      word-break: break-word;
      width: 752px;
      position: absolute;
      height: 320px;
      left: 0;
      top: 70px;
    }
  }
</style>
