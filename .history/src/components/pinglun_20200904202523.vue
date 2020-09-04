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
                    <el-popconfirm
  title="这是一段内容确定删除吗？"
>
  <p class="gray">删除</p>
</el-popconfirm>
                    
              </div>
            </div>
            <div id="in" v-show="replyIn">
              <textarea class="putIn" maxlength="200"  placeholder="限200字以内,登录后方可回复" rows="2" v-model="messData">
              </textarea>
              <img class="sendI" src="../assets/fasong.png" width="25" height="25" @click="send">
            </div>
            <div style="height:auto" class="reply" v-for="(item,i) in data.replies" :key="i">
              <div v-show="i<2||show">
                <p>{{data.replies[i].reply}}</p>
                <div id="NTTwo">
                  <p style="color:#77c1d1">--{{data.replies[i].name}}</p>
                  <p class="gray2">{{data.replies[i].time}}</p>
                  <div  @click="deleteReply(i)" style="width:5%;margin-left:1%;">
                    <p class="gray">删除</p>
                  </div>
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
        show:false,
        user_id:Number,
        name:""
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
      getDatetime:function() {
            var now = new Date();
            var year = now.getFullYear();       
            var month = now.getMonth() + 1;     
            var day = now.getDate();            
            var hh = now.getHours();            
            var mm = now.getMinutes();          
            var ss = now.getSeconds();          
            var clock = year + "-";
            if (month < 10)
                clock += "0";
            clock += month + "-";
            if (day < 10)
                clock += "0";
            clock += day + " ";
            if (hh < 10)
                clock += "0";
            clock += hh + ":";
            if (mm < 10) clock += '0';
            clock += mm ;
            return clock;
        },
      reply:function(){
        this.replyIn=!this.replyIn;
      },
      send:function(){
            axios.post('http://106.75.157.168:5657/api/reply', {
                    comment_id:this.data.id,
                    text:this.messData
                })
                .then((response) =>{
                    console.log(response.data)
                    if(response.data.status=="success"){
                        this.data.replies.push({
                            reply:this.messData,
                            name:this.name,
                            time:this.getDatetime(),
                            id:response.data.reply_id
                        });
                        this.$message({
                            message: '评论成功',
                            type: 'success'
                        });
                    }
                    else{
                        this.$message.error('评论失败');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
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
      },
      deleteReply:function(i){
          console.log(this.data.replies[i].id);
          axios({
            url:'http://106.75.157.168:5657/api/del_reply',
              method: 'DELETE',
              data:{
                id:this.data.replies[i].id
              }
            })
            .then((response)=>{
              if(response.data.status=="success"){
                for(let j=i;j<this.data.replies.length;j++){
                    this.data.replies[j]=this.data.replies[j+1];
                }
                this.data.replies.pop();
                Message.success('删除成功');
              }
              else{
                Message.error('删除失败，这条回复不是您发表的');
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
    },
    created(){
        axios({
            url:'http://106.75.157.168:5657/api/getinfo2',
	            method: 'get'
            })
            .then((response)=>{
                console.log(response.data);
                this.user_id=response.data.用户id;
                this.name=response.data.用户名;
            })
            .catch(function(error){
                console.log(error);
            });
    },
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
  align-items: center;
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