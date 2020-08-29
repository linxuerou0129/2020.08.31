<template>
<el-card class="box-card">
    
</el-card>
</template>

<script>
import axios from 'axios'
export default {
    methods:{
    },
    name:'pinglunList',
    data(){
        return{
            name:"",
            imageUrl:"",
        }
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
    display: block;
    line-height: 45px;
    text-align: center;
}
.box-card {
    height: 50px;
    background-color: white;
}
</style>