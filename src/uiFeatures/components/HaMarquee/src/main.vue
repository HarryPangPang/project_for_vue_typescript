<template>
  <div class="_marquee_warp">
    <p v-marquee>
      <span>{{text}}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Notfound extends Vue {
    @Prop() text!:string
}
</script>
<style lang="scss" scoped>
._marquee_warp {
  height: 50px;
  width: 100px;
  overflow: hidden;
  p {
    white-space: nowrap;
  }
  p.marquee {
    word-break: keep-all;
    width: fit-content; // NOTE 必须
    animation: textloop linear infinite;
    min-width: 100%;
    span {
      padding-right: 20px;
    }
  }
}
</style>
