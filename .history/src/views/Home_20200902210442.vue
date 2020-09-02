<template>
  <div class="content">
    <div class="carousel">
    <el-carousel :interval="5000" direction="vertical" height="500px">
      <el-carousel-item 
      v-for="(item,index) in list"
      :key="index">
        <div class="head">
          <strong>{{item.title}}</strong>
          <p style="font-size: 16px;">-- {{item.author}}</p>
        </div>
        <img class="photo" :src="item.image">
      </el-carousel-item>
    </el-carousel>
    </div>
    <div class="search">
      <el-input
        placeholder="请输入地名/游记标题"
        v-model="input"
        clearable class="input">
      </el-input>
      <el-button 
      type="primary" 
      icon="el-icon-search" 
      style="margin-left:6%;height:40px;margin-top:1.77%"
      @click="hrefSearch"></el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  data(){
        return{
            input:'',
            list:[]
        }
    },
    methods:{
        hrefSearch(){
            location.href="/Search?page=1&keyword="+this.input;
        }
    },
    created(){
        axios({
            url:'http://106.75.157.168:5657/api/recommend_article',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                 this.list=response.data;
            })
            .catch(function(error){
                console.log(error);
            });
    }
}
</script>

<style scoped>
.input{
  width: 80%;
  left: 5%;
  top: 18%;
}
.search{
  position: fixed;
  height: 10%;
  width: 50%;
  background-color: black;
  z-index: 9999;
  opacity: 50%;
  top: 80%;
  left: 25%;
  border-radius: 5px;
   display: -webkit-flex; /* Safari */
  display: flex;
    flex-direction: row;
}
.photo{
  z-index: 9;
  width: auto;
  height: 100%;
  display: table;
            margin: 0 auto;
}
.head{
  z-index: 999;
    position: absolute;
  color: white;
  font-size: 22px;
  left: 7%;
  top: 6%;
}
.carousel{
  position: relative;
  top: 4%;
  width: 96%;
  left: 2%;
  z-index: 9;
}
.content{
    width: 100%;
   top: 11.3%;
  
    bottom:0;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
  background-color:#FAFAFA;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>