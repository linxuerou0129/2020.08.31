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
        <el-tabs tab-position="left" style="width:84%;margin-left:8%;padding-bottom:20px">
            <el-tab-pane label="收到的赞">

            </el-tab-pane>
            <el-tab-pane label="收藏我的">

            </el-tab-pane>
            <el-tab-pane label="评论我的">
                <el-collapse>
                    <el-collapse-item>
                        <template slot="title">
                            <el-avatar :size="35" :src="imageUrl" style="margin-left:10px;margin-right:10px"></el-avatar>
                            <div class="row">
                                <strong style="margin-right:5px">1111111111</strong>
                                <p style="margin-right:5px">评论了</p><p style="color:#b1b2bb;margin-right:50px">"1111111111111"</p>
                            </div>
                            <p class="gray">2020-08-30 12:30</p>
                        </template>
                        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="回复我的">

            </el-tab-pane>
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
.gray{
    color:#b1b2bb;
    font-size: 11px;
}
.row{
      display: -webkit-flex; /* Safari */
  display: flex;
    flex-direction: row;
    align-items: center;
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