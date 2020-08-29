<template>
      <div id="all" v-show="ifDel">
          <div id="avatar">
              <el-avatar :src="data.avatar"></el-avatar>
              <div id="nameTime">
                <strong class="out">{{data.name}}</strong>
                <p class="gray">{{data.time}}</p>
              </div>
         </div>
            <p class="comment">{{data.comment}}</p>
            <div id="reDe">
              <div @click="reply" style="width:5%;margin-left:1%;margin-bottom:1%">
                <p class="gray">回复</p>
              </div>
              <div  @click="deleteIt" style="width:5%;margin-left:1%;margin-bottom:1%">
                    <p class="gray">删除</p>
              </div>
            </div>
            <div id="in" v-show="replyIn">
              <textarea class="putIn" maxlength="400"  placeholder="限200字以内,登录后方可回复" rows="2" v-model="messData">
              </textarea>
              <img class="sendI" src="../assets/fasong.png" width="25" height="25" @click="send">
            </div>
            <div style="height:auto" class="reply" v-for="(item,i) in data.replies" :key="i">
              <div v-show="i<2||show">
                <p>{{data.replies[i].reply}}</p>
                <div id="NTTwo">
                  <p style="color:#77c1d1">--{{data.replies[i].name}}</p>
                  <p class="gray2">{{data.replies[i].time}}</p>
                </div>
              </div>
              <div v-show="(i==2)&&(!show)">
                <el-button type="text" @click="show=true">显示更多</el-button>
              </div>
            </div>
            <el-divider></el-divider>
      </div>
</template>

<script>
import { Message } from 'element-ui';
import axios from 'axios'
export default {
   data() {
      return {
        ifDel:true,
        name:'1111111',
        messData:'',
        replyIn:false,
        show:false
        /*data: {
          comment: "啊啊啊", 
          floor: 1, 
          replies: [
            {
              reply:"1111",
              name:'1222'
              }
          ]
        },*/
      };
      
    },
    props: ["data"],
    methods:{
      reply:function(){
        this.replyIn=!this.replyIn;
      },
      send:function(){
            if(this.messData==""){
                this.$message({
                    message: '评论不可为空',
                    type: 'warning'
                });
            }
            else{
                console.log(this.data.floor);
                this.$socket.emit("reply",{replies:this.messData,id:this.data.floor});
                this.messData="";
            }
        },
      deleteIt:function(){
        axios({
            url:'http://106.75.157.168:5657/api/del_comment',
              method: 'DELETE',
              data:{
                id:this.data.id
              }
            })
            .then((response)=>{
              console.log(response.data);
              if(response.data.status=="success"){
                this.ifDel=false;
                Message.success('删除成功');
              }
              else{
                Message.error('删除失败，这条评论不是您发表的');
              }
            })
            .catch(function(error){
                console.log(error);
            });
      }
    },
    watch:{
        data(newdata,olddata){
            this.data=newdata;
        }
    }
}
</script>

<style scoped>
.gray2{
  color:#b1b2bb;
    font-size: 11px;
    margin:1.4%;
}
#reDe{
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
}
#NTTwo{
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
}
#nameTime{
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: column;  
  position: relative;
  margin-left:1%;
  width: 10%;
}
#avatar{
   display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
}
.putIn{
    border-radius: 5px;
    position: absolute;
    width: 91%;
    height: 70%;
    left: 0;
}
.sendI{
    position: relative;
    margin: 3%;
    background-color: #0176ff;
    border-radius: 50%;
}
#in{
    position: relative;
    width:94%;
    left: 3%;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    word-wrap:break-word;
    word-break:break-all; 
}
.gray{
    color:#b1b2bb;
    font-size: 11px;
    margin: 0 1% 1% 1%;
}
.comment{
  font-size: 15px;
  margin-left: 1%;
}
.reply{
    word-wrap:break-word;
    word-break:break-all; 
    width:94%;
    left: 3%;
    color: #6e6f75;
    font-size: 12px;
    position: relative;
    background-color:#fafafa;
    padding: 5px;
    border-radius:5px;
}
.out{
    position: relative;
    color:#77c1d1;
    font-size: 15px;
}
#all{
  position: relative;
  width: 100%;
}
</style>