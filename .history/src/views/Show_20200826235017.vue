<template>
<div class="content">
    <div>
        <card class="card"></card>
    </div>
    <div class="right">
        <el-carousel indicator-position="outside">
            <el-carousel-item>
                <img class="photo" src="../assets/test1.jpg">
            </el-carousel-item>
        </el-carousel>    
        <h2>居家小家电分享|pick这位家庭饮水小助理~</h2>
    </div>   
</div>

</template>

<style scoped>
.photo{
  z-index: 9;
  width: auto;
  height: 100%;
  display: table;
            margin: 0 auto;
}
.right{
    width: 58%;
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