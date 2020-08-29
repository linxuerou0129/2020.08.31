<template>
<div class="content">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
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
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
        }
    },
    methods:{
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