<template>
    
</template>

<script>
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
        }
    },
    created(){
        this.article_id=this.getQueryVariable("article_id");
        console.log(this.article_id);
    }
}
</script>