<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <div>{{title}}</div>
    <h4 v-if="userData.player">{{userData.player.nickname}}</h4>
    <button @click="goAbout">goAbout</button>
    <HaDialog :visable.sync='visable'></HaDialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

// 组件注册
@Component({
  name: 'Home',
  components: {
  },
})

export default class Home extends Vue {
// 这里就是data属性
  visable:Boolean = true

  userData:Object = {}


  private title:String = 'title'

  private goAbout() {
    this.$router.push('/about');
  }
  // 生命周期函数

  created() {
  }

  mounted() {
    // this.$toast({
    //   msg: 'This is Toast',
    //   visable: false,
    // });
    this.$http.get(this.$api.userinfo).then((res:any) => {
      this.userData = res.data.data;
    });
  }
}
</script>
<style lang="scss" scoped>
.home{
  text-align: center;
}
</style>
