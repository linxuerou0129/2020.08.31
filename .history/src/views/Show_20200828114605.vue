<template>
<div class="content">
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
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <textarea class="putIn" maxlength="800"  placeholder="限400字以内,登录后方可评论" v-model="comment" rows="2">
            </textarea>
            <img class="sendI" src="../assets/fasong.png" width="25" height="25" @click="send">
        </div>
    </div>   
</div>

</template>

<script>
import card from '../components/card.vue'
import axios from 'axios'
export default {
    components: { 
        card
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
            comment:""
        }
    },
    methods:{
        send:function(){
            if(this.comment==""){
                this.$message({
                    message: '评论不可为空',
                    type: 'warning'
                });
            }
            else{

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
                    this.collect="el-icon-star-on",
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
        }
    },
    created(){
        this.article_id=this.getQueryVariable("article_id");
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
    margin: 17px;
    position: absolute;
    width: 91%;
    left: 0;
}
#in{
    height: 2%;
    width: 100%;
    border-top: 0.5px solid #edeef6;
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