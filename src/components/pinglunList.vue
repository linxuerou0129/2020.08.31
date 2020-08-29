<template>
<el-card class="box-card">
    <el-avatar :size="50" :src="imageUrl"></el-avatar>
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
            imageUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
    background-color: white;
    margin-top: 10px;
}
</style>