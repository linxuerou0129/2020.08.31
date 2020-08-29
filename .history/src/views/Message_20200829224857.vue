<template>
<div class="content">
    <img src="../assets/map.jpg" style="width:100%">
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
        <el-tabs tab-position="left" style="width:84%;margin-left:8%;background-color:white">
            <el-tab-pane label="收到的赞">用户管理</el-tab-pane>
            <el-tab-pane label="收藏我的">配置管理</el-tab-pane>
            <el-tab-pane label="评论我的">角色管理</el-tab-pane>
            <el-tab-pane label="回复我的">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div> 
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
        }
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created(){
      axios({
            url:'http://106.75.157.168:5657/api/getinfo',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                 this.imageUrl="http://106.75.157.168:5657/api"+response.data.头像;
                 this.name=response.data.用户名;
            })
            .catch(function(error){
                console.log(error);
            });
    }
}
</script>

<style scoped>
.head1{
  position: relative;
  left: 75%;
  font-size: 15px;
}
.body{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    margin-bottom: 2%;
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