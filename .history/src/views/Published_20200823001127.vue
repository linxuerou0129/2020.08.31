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
                    {{name}}
                </p>
                <el-button class="button" @click="hrefEdit" round>编辑个人资料</el-button>
            </el-card>
            <el-card class="content-card">
                <div slot="header" class="clearfix">
                    <span>我的游记</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="hrefPublish">写游记</el-button>
                </div>
                <div>
                    <el-card class="single">
                        <div style="display: -webkit-flex; /* Safari */
                            display: flex;
                            flex-direction: row;">
                            <el-image
                            style="width: 390px; height: 130px;background-color: #f5f7fa;"
                            :src="imageUrl"
                            fit="contain">
                            </el-image>
                            <h3 class="hide">第一次去土楼怎么玩第一次去土楼怎么玩（小白必备的福建土楼超详细攻略）哈哈哈哈哈哈哈哈哈哈哈</h3>
                        </div>
                    </el-card>
                </div>
            </el-card>
        </div>
    </div>
    <div style="position: absolute;z-index: 9999;top:39%;left:16.5%">
        <el-image
        style="width: 160px; height: 160px;border-radius: 50%;"
        :src="imageUrl"
        :fit="fit"></el-image>
    </div>
    
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            name:"",
            imageUrl:""
        }
    },
    methods:{
        hrefPublish(){
            location.href="/Publish"
        },
        hrefEdit(){
            location.href="/Edit"
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    created(){
      axios({
            url:'http://47.107.243.207/api/get_user_info',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                 this.imageUrl="http://47.107.243.207/api"+response.data.头像;
                 this.name=response.data.用户名;
            })
            .catch(function(error){
                console.log(error);
            });
    }
}
</script>

<style scoped>
.hide{
    width: 100%;
    margin-left: 8px;
}
.single{
    height: 168px;
}
.content-card{
    margin-left: 1.7%;
    margin-top: 1.5%;
    width: 52.5%;
}
.body{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    margin-bottom: 2%;
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
  
    bottom:0;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
  background-color: #FAFAFA;
}
</style>