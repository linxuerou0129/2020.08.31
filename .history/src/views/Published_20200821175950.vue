<template>
<div class="content">
    <img src="../assets/map.jpg" style="width:100%">
<el-menu 
    :default-active="$route.path" 
    class="el-menu-demo" mode="horizontal" 
    @select="handleSelect" 
    text-color="#FCDAA9" 
    active-text-color="#f8b600" 
    router>
  <el-menu-item index="/Published" class="head1"><strong>我的发布</strong></el-menu-item>
  <el-menu-item index="/MyCollect" class="head1"><strong>我的收藏</strong></el-menu-item>
  <el-menu-item index="/Message" class="head1"><strong>消息中心</strong></el-menu-item>
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