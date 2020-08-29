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
        <el-menu
        default-active="2"
        class="left">
        <el-menu-item index="1">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
            </template>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
        </el-menu>
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
.left{
    width: 30%;
    margin-left: 8%;
}
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