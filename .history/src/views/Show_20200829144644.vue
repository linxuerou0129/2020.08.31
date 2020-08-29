<template>
<div class="content"  id="x">
    <div>
        <card class="card" :id="author_id"></card>
    </div>
    <div class="right">
        <el-carousel 
        indicator-position="outside" 
        arrow="always" >
            <el-carousel-item 
            v-for="(item,index) in image"
            :key="index">
                <img class="photo" :src="item.image">
            </el-carousel-item>
        </el-carousel>    
        <div>
            <h2>{{title}}</h2>
            <div class="border">
                <div class="row">
                    <img src="../assets/shijian.png" width="30" height="30" style="margin-right:5px;">
                    <p>出发时间</p>
                    <p class="xiegang">/</p>
                    <p>{{start}}</p>
                </div>
                <div class="row">
                    <img src="../assets/tianshu.png" width="27" height="27" style="margin-right:5px;">
                    <p>出行天数</p>
                    <p class="xiegang">/</p>
                    <p>{{days}}</p>
                </div>
                <div class="row">
                    <img src="../assets/people.png" width="30" height="30" style="margin-right:5px;">
                    <p>人物</p>
                    <p class="xiegang">/</p>
                    <p>{{people}}</p>
                </div>
                <div class="row">
                    <img src="../assets/feiyong.png" width="30" height="30" style="margin-right:5px;">
                    <p>人均费用</p>
                    <p class="xiegang">/</p>
                    <p>{{pay}}</p>
                </div>
                <div class="row">
                    <img src="../assets/location.png" width="28" height="28" style="margin-right:5px;">
                    <p>地点</p>
                    <p class="xiegang">/</p>
                    <p>{{position}}</p>
                </div>
            </div>
            <p>{{text}}</p>
        </div>
        <div class="action">
            <div class="row" style="margin-right:30px;">
                <el-button :type="type1" :icon="collect" circle @click="collectIt" style="margin-right:4px;"></el-button>
                <p>{{collection}}</p>
            </div>
            <div class="row">
                <el-button :type="type2" :icon="zan" circle @click="zanIt"></el-button>
                <P  style="margin-left:4px">{{thumb}}</P>
            </div>
        </div>
        <div  id="in">
            <el-input
            type="textarea"
            class="putIn"
            :autosize="{ minRows: 2, maxRows: 5}"
            placeholder="登录后方可评论"
            v-model="comment"
            maxlength="200"
            show-word-limit>
            </el-input>
            <img class="sendI" src="../assets/fasong.png" width="25" height="25" @click="send">
        </div>
        <div>
                <component
                    v-for="(item,index) in comName"
                    :is="item.name"
                    :key="index"
                    :data="item.data"
                ></component>
        </div>
    </div>   
</div>

</template>

<script>
import commentS from '../components/pinglun.vue'
import card from '../components/card.vue'
import axios from 'axios'
export default {
    components: { 
        card,
        commentS
    },
    data(){
        return{
            article_id:Number,
            collect:"el-icon-star-off",
            zan:"el-icon-thumb",
            type1:"",
            type2:"",
            author_id:Number,
            image:[],
            title:"",
            start:"",
            days:"",
            people:"",
            pay:"",
            position:"",
            text:"",
            collection:Number,
            thumb:Number,
            comment:"",
            data:{
                comment: "啊啊啊", 
                id: 1, 
                avatar:"",
                replies: [
                    "1111",
                    '1222'
                ],
                time:"",
                user_id:1
            },
            comName:[],
            avatar:"",
            user_id:Number,
            name:""
        }
    },
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
        send:function(){
            if(this.comment==""){
                this.$message({
                    message: '评论不可为空',
                    type: 'warning'
                });
            }
            else{
                axios.post('http://106.75.157.168:5657/api/comment', {
                    article_id:this.article_id,
                    text:this.comment
                })
                .then((response) =>{
                    if(response.data.status=="success"){
                        this.data={
                            comment:this.comment, 
                            id: response.data.comment_id, 
                            avatar:this.avatar,
                            replies: [],
                            time:this.getDatetime(),
                            user_id:this.user_id,
                            name:this.name,
                        }
                        this.addCom();
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
            }
        },
        zanIt(){
            axios.post('http://106.75.157.168:5657/api/thumb', {
                id:this.article_id
              })
            .then((response) =>{
                if(response.data.status=="add"){
                    this.type2="primary";
                    this.thumb+=1;
                }
                else{
                    this.type2=""; 
                    this.thumb-=1;
                }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        getQueryVariable(variable){
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
            }
            return(false);
        },
        collectIt(){
            axios.post('http://106.75.157.168:5657/api/collect', {
                article_id:this.article_id
              })
            .then((response) =>{
                console.log(response.data)
                if(response.data.status=="add"){
                    this.type1="primary";
                    this.collect="el-icon-star-on";
                    this.collection+=1;
                }
                else{
                    this.type1="",
                    this.collect="el-icon-star-off";
                    this.collection-=1;
                }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        addCom:function(){
            this.comName.push({
                name:"commentS",
                data:this.data
            });
            let div = document.getElementById('x');
            div.scrollTop = div.scrollHeight;
        },
    },
    created(){
        this.article_id=this.getQueryVariable("article_id");
        axios({
            url:'http://106.75.157.168:5657/api/getinfo',
	            method: 'get'
            })
            .then((response)=>{
                console.log(response.data);
                this.avatar="http://106.75.157.168:5657/api"+response.data.头像;
                this.user_id=response.data.用户id;
                this.name=response.data.用户名;
            })
            .catch(function(error){
                console.log(error);
            });
    },
    mounted(){
        console.log(this.article_id);
        axios.get('http://106.75.157.168:5657/api/getarticle', {
            params: {
                article_id:this.article_id
            },
        })
        .then((response)=>{
             console.log(response.data);
             this.author_id=response.data.author_id;
             this.image=response.data.image;
             this.title=response.data.title;
             this.start=response.data.start;
             this.days=response.data.days;
             this.people=response.data.people;
             this.pay=response.data.pay;
             this.position=response.data.position;
             this.text=response.data.text;
             this.collection=response.data.collection;
             this.thumb=response.data.thumb;
             if(response.data.if_collection==true){
                this.type1="primary";
                this.collect="el-icon-star-on";
             }
             if(response.data.if_thumb==true){
                this.type2="primary";
             }
        })
        .catch(function(error){
            console.log(error);
        });
        axios.post('http://106.75.157.168:5657/api/getcomments', {
                article_id:this.article_id
              })
            .then((response)=>{
                 console.log(response.data);
                let array=response.data.comments;
                    for(let i=0;i<array.length;i++){
                        array[i].avatar="http://106.75.157.168:5657/api"+array[i].avatar;
                        this.data=array[i];
                        this.addCom();
                    }
            })
            .catch(function(error){
                console.log(error);
            });
    }
}
</script>

<style scoped>
.sendI{
    position: relative;
    margin: 3%;
    background-color: #0176ff;
    border-radius: 50%;
}
.putIn{
    border: none;
    position: absolute;
    width: 91%;
    left: 0;
}
#in{
    margin-top: 12%;
    width: 100%;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    word-wrap:break-word;
    word-break:break-all;
}
.action{
    display: -webkit-flex; /* Safari */
  display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: 73%;
}
.row{
      display: -webkit-flex; /* Safari */
  display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 20px;
} 
.xiegang{
    color: #f8b600;
}
.border {
    padding: 1em;
    border: 1px dashed transparent;
    background: linear-gradient(white,white) padding-box,
    repeating-linear-gradient(-45deg,#ccc 0, #ccc 0.25em,white 0,white 0.75em);
     display: -webkit-flex; /* Safari */
  display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.photo{
  z-index: 9;
  width: auto;
  height: 100%;
  display: table;
  margin: 0 auto;
}
.right{
    width: 57%;
    position: absolute;
    right: 12%;
    margin-top: 20px;
}
.card{
    position: absolute;
    left: 12%;
    margin-top: 20px;
    width: 16%;
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
   display: -webkit-flex; /* Safari */
  display: flex;
    flex-direction: row;
}

</style>