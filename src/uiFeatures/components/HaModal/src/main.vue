<template>
  <div class="ha-mask" v-show="visable">
    <div class="ha-content"><slot name="content"></slot></div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, PropSync, Watch, Emit,
} from 'vue-property-decorator';

@Component({
  name: 'haModal',
})
export default class haModal extends Vue {
  @Watch('visable', { deep: true, immediate: true })
  onVisable(val:boolean) {
    if (val) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

    @PropSync('visable', {
      type: Boolean,
      default: false,
      required: true,
    }) syncedVisable !: Boolean
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes mask_slip_in{
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
.ha-mask {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background-color: rgba(0,0,0,0.8);
  animation:mask_slip_in 50ms ease-in-out forwards;
  z-index: 100;
  .ha-content{
    width: 100%;
    height: 100%;
    left: 0;
  top: 0;
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
