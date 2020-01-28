<template>
  <div class="_item_warp">
      <div class="_item_img"></div>
      <div class="_item_name"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  State, Getter, Action, Mutation, namespace,
} from 'vuex-class';

const homeStore = namespace('home');

@Component(
  {
    name: 'HaItem',
  },
)

export default class Hahead extends Vue {
  @Prop({
    type: Function,
    default: undefined,
    required: false,
  }) eventQuestion ?: Function

  @homeStore.State(state => state.info) private info:any
}
</script>
<style lang="scss" scoped>
</style>
