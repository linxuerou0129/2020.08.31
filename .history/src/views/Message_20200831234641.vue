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
                <el-card 
                shadow="never" 
                v-for="(item,index) in zanList"
                :key="index" style="height:50px">
                    <div class="row" style="height:15px">
                        <el-avatar :size="35" :src="item.thumb_user_avatar" style="margin-left:10px;margin-right:10px"></el-avatar>
                        <div class="row">
                            <strong style="margin-right:5px">{{item.thumb_user_name}}</strong>
                            <p style="margin-right:5px">赞了</p><strong style="color:#b1b2bb;margin-right:20px">"{{item.article_title}}"</strong>
                        </div>
                        <p class="gray">{{item.time}}</p>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="收藏我的">
                <el-card 
                shadow="never" 
                v-for="(item,index) in collectList"
                :key="index" style="height:50px">
                    <div class="row" style="height:15px">
                        <el-avatar :size="35" :src="item.collection_user_avatar" style="margin-left:10px;margin-right:10px"></el-avatar>
                        <div class="row">
                            <strong style="margin-right:5px">{{item.collection_user_name}}</strong>
                            <p style="margin-right:5px">赞了</p><strong style="color:#b1b2bb;margin-right:20px">"{{item.article_title}}"</strong>
                        </div>
                        <p class="gray">{{item.time}}</p>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="评论我的">
                <el-collapse>
                    <el-collapse-item 
                    v-for="(item,index) in pinglunList"
                    :key="index">
                        <template slot="title">
                            <el-avatar :size="35" :src="item.comment_user_avatar" style="margin-left:10px;margin-right:10px"></el-avatar>
                            <div class="row">
                                <strong style="margin-right:5px">{{item.comment_user_name}}</strong>
                                <p style="margin-right:5px">评论了</p><strong style="color:#b1b2bb;margin-right:20px">"{{item.article_title}}"</strong>
                            </div>
                            <p class="gray">{{item.comment_time}}</p>
                        </template>
                        <div style="margin-left:10px;margin-right:10px">{{item.comment_text}}</div>
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="回复我的">
                <el-collapse>
                    <el-collapse-item 
                    v-for="(item,index) in replyList"
                    :key="index">
                        <template slot="title">
                            <el-avatar :size="35" :src="item.reply_user_avatar" style="margin-left:10px;margin-right:10px"></el-avatar>
                            <div class="row">
                                <strong style="margin-right:5px">{{item.reply_user_name}}</strong>
                                <p style="margin-right:5px">回复了</p><strong style="color:#b1b2bb;margin-right:20px">"{{item.comment_text}}"</strong>
                            </div>
                            <p class="gray">{{item.reply_time}}</p>
                        </template>
                        <div style="margin-left:10px;margin-right:10px">{{item.reply_text}}</div>
                    </el-collapse-item>
                </el-collapse>
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
            pinglunList:[],
            replyList:[],
            zanList:[],
            collectList:[]
        }
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    created(){
      axios({
            url:'http://106.75.157.168:5657/api/comment_me_list',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                 this.pinglunList=response.data.comment_me;
                 for(let i=0;i<this.pinglunList.length;i++){
                     this.pinglunList[i].comment_user_avatar="http://106.75.157.168:5657/api"+this.pinglunList[i].comment_user_avatar;
                 }
                 console.log(this.pinglunList)
            })
            .catch(function(error){
                console.log(error);
            });
        axios({
            url:'http://106.75.157.168:5657/api/reply_me_list',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                 this.replyList=response.data.reply_me;
                 for(let i=0;i<this.replyList.length;i++){
                     this.replyList[i].reply_user_avatar="http://106.75.157.168:5657/api"+this.replyList[i].reply_user_avatar;
                 }
                 console.log(this.replyList)
            })
            .catch(function(error){
                console.log(error);
            });
        axios({
            url:'http://106.75.157.168:5657/api/thumb_me_list',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                 this.zanList=response.data.thumb_me_users;
                 for(let i=0;i<this.zanList.length;i++){
                     this.zanList[i].thumb_user_avatar="http://106.75.157.168:5657/api"+this.zanList[i].thumb_user_avatar;
                 }
                 console.log(this.zanList)
            })
            .catch(function(error){
                console.log(error);
            });
        axios({
            url:'http://106.75.157.168:5657/api/collect_me_list',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                 this.collectList=response.data.collect_me_users;
                 for(let i=0;i<this.collectList.length;i++){
                     this.collectList[i].collection_user_avatar="http://106.75.157.168:5657/api"+this.collectList[i].collection_user_avatar;
                 }
                 console.log(this.collectList)
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