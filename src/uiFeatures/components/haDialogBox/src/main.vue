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
  name: 'haDialogBox',
})
export default class haDialogBox extends Vue {
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
</style>
