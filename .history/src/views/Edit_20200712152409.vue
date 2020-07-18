<template>
  <div class="content">
    <el-card class="card">
      <el-tabs tab-position="left" style="height: 200px;">
        <el-tab-pane label="用户信息设置">用户信息设置</el-tab-pane>
        <el-tab-pane label="帐号安全设置">帐号安全设置</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>
.card{
  position: relative;
  width: 80%;
  left: 10%;
  top: 10%;
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