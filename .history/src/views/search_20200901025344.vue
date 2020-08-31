<template>
<div class="content">
    <p class="gray">以下为您找到 {{this.articleNum}} 条关于“{{this.keyword}}”的游记</p>
    <el-card 
    class="single" 
    shadow="hover"
    v-for="(item,index) in comName"
    :key="index">
        <div style="display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;" 
        @click="hrefArticle(item.id)">
            <el-image
            style="width: 390px; height: 130px;background-color: #f5f7fa;"
            :src="item.image"
            fit="contain">
            </el-image>
            <div class="hide">
                <h4>{{item.title}}</h4>
                <div class="bottom">
                    <img src="../assets/dingwei.png" width="20"><p class="small">{{item.position}}</p>
                </div>
            </div>
        </div>
    </el-card>
    <el-pagination
    class="pageDepart"
    layout="prev, pager, next"
    :hide-on-single-page="true"
    :total="articleNum"
    @current-change="changePage">
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
            articleNum:1,
            comName:[],
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
        hrefArticle(a){
            console.log(a);
            location.href="/Show?article_id="+a
        },
        changePage(val){
            console.log(val)
            this.page=val;
            axios.get('http://106.75.157.168:5657/api/search_article', {
                params: {
                    page:this.page,
                    keyword:this.keyword
                },
            })
            .then((response)=>{
                console.log(response.data);
                this.articleNum=response.data.allarticles;
                console.log(typeof this.articleNum)
                this.comName=response.data.search_result
            })
            .catch(function(error){
                console.log(error);
            });
        }
    },
    created(){
        this.page=this.getQueryVariable("page");
        this.keyword=decodeURI(location.href).split('&')[1].split('=')[1];;
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
            console.log(typeof this.articleNum)
             this.comName=response.data.search_result
        })
        .catch(function(error){
            console.log(error);
        });
    }
}
</script>

<style scoped>
.small{
     color:#b1b2bb;
    font-size: 11px;   
}
.bottom{
    bottom: 0;
    display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
}
.hide{
    width: 100%;
    margin-left: 20px;
    display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: column;
}
.single{
    height: 168px;
    width: 50%;
    margin-left: 25%;
}
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
    margin: 20px;
}
</style>