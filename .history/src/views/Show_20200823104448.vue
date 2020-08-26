<template>
    
</template>

<script>
import axios from 'axios'
export default {
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
        console.log(this.article_id);
    },
    mounted(){
        axios({
            url:'http://47.107.243.207/api/get_all_article?article_id='+this.article_id,
	            method: 'get'
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