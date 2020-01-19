<template>
  <div class="about">
    <h1>This is an 404 page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component

export default class Notfound extends Vue {
  created() {
    this.$router.push('/');
  }
}
</script>
<style lang="scss" scoped>

</style>
