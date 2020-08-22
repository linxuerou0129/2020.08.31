<template>
<div class="content">
    <img src="../assets/map.jpg" style="width:100%">
<el-menu :default-active="$route.path"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b" router>
  <el-menu-item index="/" class="head1"><strong>首页</strong></el-menu-item>
  <el-submenu class="head3" v-if="login" index="/Edit">
    <template slot="title">
      <el-avatar :src="circleUrl"></el-avatar>
    </template>
    <el-menu-item index="/Edit">
      我的设置
    </el-menu-item>
    <el-menu-item index="/Publish">
      发布游记
    </el-menu-item>
    <el-menu-item index="/Published">
      个人中心
    </el-menu-item>
    <el-menu-item index="/MyCollect">
      我的收藏
    </el-menu-item>
    <el-menu-item index="/Message">
      消息中心
    </el-menu-item>
    <el-menu-item  @click="logout">
      退出
    </el-menu-item>
  </el-submenu>
  <el-submenu v-if="!login"  class="head4" index=1>
    <template slot="title">
      <strong>登录/注册</strong>
    </template>
    <el-menu-item @click="dialogFormVisible = true">
      注册
    </el-menu-item>
    <el-menu-item @click="loginFormShow = true">
      登录
    </el-menu-item>
  </el-submenu>
</el-menu>
</div>
</template>

<style scoped>
.content{
  width: 100%;
   top: 11.3%;
  
    bottom:0;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
  background-color: #FAFAFA;
}
</style>