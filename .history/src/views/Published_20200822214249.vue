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
        <div class="body">
            <el-card class="box-card">
                <p class="name">
                    八月三十
                </p>
                <el-button class="button" round>编辑个人资料</el-button>
            </el-card>
            <el-card class="content-card">

            </el-card>
        </div>
    </div>
    <img src="../assets/touxiang.jpeg" width="160" style="border-radius: 50%;position: absolute;z-index: 9999;top:50%;left:16.5%">
</div>
</template>

<style scoped>
.content-card{
    margin-left: 1.7%;
    margin-top: 1.5%;
    width: 52.5%;
}
.body{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
}
.button{
    width: 90%;
    margin-left: 5%;
}
.name{
    width: 100%;
    height: 45px;
    display: block;
    line-height: 45px;
    text-align: center;
    position:relative;
    margin-top: 30%;
    font-size: 22px;
}
.box-card {
    width: 30%;
    margin-left: 8%;
    height: 250px;
}
.head1{
  position: relative;
  left: 75%;
  font-size: 15px;
}
.content{
  width: 100%;
   top: 11.3%;
  
    bottom:20%;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
  background-color: #FAFAFA;
}
</style>