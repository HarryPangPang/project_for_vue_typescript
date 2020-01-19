<template>
  <div class="home">
    <div>{{msg}}</div>
     <input placeholder="change" @keyup="handleChange" value=""/>username: {{username}}
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class';

const homeStore = namespace('home');
// 组件注册
@Component({
  name: 'Home',
  components: {
  },
})


export default class Home extends Vue {
  private msg:string = 'hello'

   @homeStore.State(state => state.username) private username!:string

   @homeStore.Action('updateUsername') private updateUsername!:Function

   handleChange(e:any) {
     this.updateUsername(e.target.value);
   }
   // 生命周期函数

   created() {
   }
}
</script>
