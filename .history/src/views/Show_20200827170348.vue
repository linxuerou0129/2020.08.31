<template>
<div class="content">
    <div>
        <card class="card"></card>
    </div>
    <div class="right">
        <el-carousel indicator-position="outside" arrow="always">
            <el-carousel-item>
                <img class="photo" src="../assets/test1.jpg">
            </el-carousel-item>
        </el-carousel>    
        <div>
            <h2>居家小家电分享|pick这位家庭饮水小助理~</h2>
            <div class="border">
                <div class="row">
                    <img src="../assets/shijian.png" width="30" height="30" style="margin-right:5px;">
                    <p>出发时间</p>
                    <p class="xiegang">/</p>
                    <p>2020-04-08</p>
                </div>
                <div class="row">
                    <img src="../assets/tianshu.png" width="27" height="27" style="margin-right:5px;">
                    <p>出行天数</p>
                    <p class="xiegang">/</p>
                    <p>3天</p>
                </div>
                <div class="row">
                    <img src="../assets/people.png" width="30" height="30" style="margin-right:5px;">
                    <p>人物</p>
                    <p class="xiegang">/</p>
                    <p>情侣</p>
                </div>
                <div class="row">
                    <img src="../assets/feiyong.png" width="30" height="30" style="margin-right:5px;">
                    <p>人均费用</p>
                    <p class="xiegang">/</p>
                    <p>100元</p>
                </div>
                <div class="row">
                    <img src="../assets/location.png" width="28" height="28" style="margin-right:5px;">
                    <p>地点</p>
                    <p class="xiegang">/</p>
                    <p>福建省厦门市</p>
                </div>
            </div>
            <p>
                说到提升日常幸福感的日常家电，我觉得饮水机绝对可以拥有姓名，虽然摆在角落的饮水机日常存在感很弱，但是日常离了它还真是不行，自打换了这台美的饮水机，感觉家里好像多了一个mini茶饮吧，感觉全家人都爱上了喝水~
            </p>
        </div>
        <div>
            <img :src="collect" width="25">
            <img :src="zan" width="27">
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
            collect:require("../assets/collect.png"),
            zan:require("../assets/zan.png")
        }
    },
    methods:{
        getQueryVariable(variable){
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
            }
            return(false);
        },
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
        })
        .catch(function(error){
            console.log(error);
        });
    }
}
</script>

<style scoped>
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
    right: 5%;
    margin-top: 20px;
}
.card{
    position: absolute;
    left: 5%;
    margin-top: 20px;
    width: 30%;
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