<template>
<el-card class="box-card">
    <el-image
    style="width: 160px; height: 160px;border-radius: 50%;"
    :src="imageUrl"
    fit="fill"></el-image>
    <p class="name">
        {{name}}
    </p>
</el-card>
</template>

<script>
import axios from 'axios'
export default {
    methods:{
        hrefEdit(){
            location.href="/Edit"
        }
    },
    name:'card',
    data(){
        return{
            name:"",
            imageUrl:"",
        }
    },
    created(){
        axios.post('http://106.75.157.168:5657/api/getotherinfo', {
                user_id:this.id
              })
            .then((response) =>{
                console.log(response.data);
                this.imageUrl="http://106.75.157.168:5657/api"+response.data.头像;
                this.name=response.data.用户名;
            })
            .catch(function (error) {
              console.log(error);
            });
    },
    props:["id"],
    watch:{
        id(newdata,olddata){
            axios.post('http://106.75.157.168:5657/api/getotherinfo', {
                user_id:newdata
              })
            .then((response) =>{
                console.log(response.data);
                this.imageUrl="http://106.75.157.168:5657/api"+response.data.头像;
                this.name=response.data.用户名;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }
}
</script>

<style scoped>
.name{
    width: 100%;
    height: 45px;
}
.box-card {
    width: 30%;
    height: 250px;
}
</style>