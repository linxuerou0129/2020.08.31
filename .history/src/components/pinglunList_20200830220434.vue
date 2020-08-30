<template>
<el-card class="box-card">
    <el-avatar :size="50" :src="imageUrl"></el-avatar>
    <div>
        <div><strong>1111111111</strong><p>评论了</p><p class="gray">1111111111111</p></div>
        <el-collapse accordion>
        <el-collapse-item>
            <template slot="title">
                <div>
                    <p class="gray">2020-08-30 12:30</p>
                </div>
            </template>
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        </el-collapse>
    </div>
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
.gray{
    color:#b1b2bb;
    font-size: 11px;
    margin: 0 1% 1% 1%;
}
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