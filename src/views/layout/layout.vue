<template>
  <el-container class="admin-container">
    <el-aside >
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开{{isCollapse}}</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened='true'
        :router="true"
      >
      <div class="logo">
          <i class="group-icon"></i>
          <span>Event</span>
      </div>
        <el-menu-item index="/" :route="{path:'/'}">
          <i class="el-icon-setting"></i>
          <span slot="title">网页活动</span>
        </el-menu-item>
         <!-- <el-menu-item index="/about" :route="{path:'/about'}">
          <i class="el-icon-setting"></i>
          <span slot="title">网页活动</span>
        </el-menu-item> -->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <slot name="main"></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component

export default class Layout extends Vue {
//   @Prop() menu: Object = {};

  isCollapse:boolean = false

  handleOpen(key:any, keyPath:any) {
    console.log(key, keyPath);
  }

  handleClose(key:any, keyPath:any) {
    console.log(key, keyPath);
  }
}
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  .admin-container{
      width: 100%;
      height: 100%;
      .logo{
          display: flex;
          align-items: center;
          width: 160px;
          height: 50px;
          line-height: 50px;
          padding: 0 20px;
          background: #145c89;
      }
      .group-icon{
          background: url('../../assets/images/logo.png') no-repeat;
          background-size: 100%;
          display: inline-block;
          height: 40px;
          width: 40px;
      }
  }
  </style>
