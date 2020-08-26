<template>
<div>
    <div>
        <card class="card"></card>
    </div>
    <div>
        <el-carousel indicator-position="outside">
            <el-carousel-item>
                <el-image
                style="width: 390px; height: 130px;background-color: #f5f7fa;"
                src="../assets/test1.jpg"
                fit="contain">
                </el-image>
            </el-carousel-item>
        </el-carousel>    
    </div>   
</div>

</template>

<style scoped>
.card{
    margin-top: 20px;
    margin-left: 5%;
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