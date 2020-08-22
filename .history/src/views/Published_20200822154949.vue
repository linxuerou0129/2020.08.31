<template>
<div class="content">
    <img src="../assets/map.jpg" style="width:100%">

<div style="position: relative;z-index: 99;">
    <el-menu 
    :default-active="$route.path" 
    class="el-menu-demo" 
    mode="horizontal" 
    @select="handleSelect" 
    text-color="black" 
    active-text-color="#f8b600" 
    router>
  <el-menu-item index="/Published" class="head1"><strong>我的发布</strong></el-menu-item>
  <el-menu-item index="/MyCollect" class="head1"><strong>我的收藏</strong></el-menu-item>
  <el-menu-item index="/Message" class="head1"><strong>消息中心</strong></el-menu-item>
</el-menu>
    <el-card class="box-card">
    </el-card>
</div>
    <img src="../assets/touxiang.jpeg" width="180" style="border-radius: 50%;position: absolute;z-index: 9999;top:30%;">
</div>
</template>

<style scoped>
.box-card {
    width: 480px;
    margin-left: 8%;
}
.head1{
  position: relative;
  left: 75%;
  font-size: 15px;
}
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