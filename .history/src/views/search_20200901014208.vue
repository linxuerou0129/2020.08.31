<template>
<div class="content">
    <p class="gray">以下为您找到56条关于“福州”的游记</p>
    <el-pagination
    class="pageDepart"
    layout="prev, pager, next"
    :hide-on-single-page="true"
    :total="articleNum">
    </el-pagination>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            page:Number,
            keyword:"",
            articleNum:Number
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
        this.page=this.getQueryVariable("page");
        this.keyword=this.getQueryVariable("keyword");
    },
    mounted(){
        console.log(this.page);
        console.log(this.keyword);
        axios.get('http://106.75.157.168:5657/api/search_article', {
            params: {
                page:this.page,
                keyword:this.keyword
            },
        })
        .then((response)=>{
             console.log(response.data);
             this.articleNum=response.data.allarticles;
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
    margin-left: 20%;
}
.content{
    width: 100%;
   top: 11.3%;
  
    bottom:0;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
}
.pageDepart{
    text-align: center; 
}
</style>