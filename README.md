# ff_vue

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Use vconsole for developmet
```
yarn serve -vconsole  //启动vconsole手机模拟
```
### Build images json info for server side
```
yarn tpl  // 构建服务端所需图片信息，构建后存在img_json_info/
```

### Compiles and minifies for production
```
yarn build
```
### Build and change images url

```
yarn build -cdn  // 将会把图片全部引用为cdn地址（jpg|png|gif|jpeg）
```

### Show analyze report after build 

```
yarn build -report  //Webpack包文件分析器
```
### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### 包含内容
1. 全局scss变量，从assets/css/index.scss引入
2. 图片压缩
3. js，css压缩
4. 打包代码分离，按需加载页面
5. 大于10240开启gzip打包
6. 删除无用css
7. 集成vconsole-webpack-plugin
8. 启动thread-loader
9. api集中在api/文件夹下，this.$api.xxxx调用
10. 默认会对重复请求进行过滤
11. 网络超时和错误会弹窗（样式待调整）
12. http请求的lang和access_token需自己配置
13. 组件默认全部集成，可在main.ts中修改成按需加载
14. 默认airbnb eslint
15. vuex-class集成，例子参考：
```
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

```


CHANGELOG:

1. 