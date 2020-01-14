<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>{{title}}</div>
    <HaDialog :visable.sync='visable'></HaDialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

// 组件注册
@Component({
  components: {
  },
})

export default class Home extends Vue {
  // 这里是为了防止this.$toast报错，暂时还没想到别的处理方法

  visable:Boolean = false

  // 这里就是data属性
  title:String = 'title'

  // 生命周期函数

  created() {
  }

  mounted() {
    // this.$toast({
    //   msg: 'This is Toast',
    //   visable: false,
    // });
    this.$http.get('userinfo').then((res:any) => {
      console.log(res);
    });
  }
}
</script>
