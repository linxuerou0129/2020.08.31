<template>
<el-card class="box-card">
    <p class="name">
        {{name}}
    </p>
    <el-button class="button" @click="hrefEdit" round>编辑个人资料</el-button>
</el-card>
</template>

<script>
export default {
    methods:{
        hrefEdit(){
            location.href="/Edit"
        }
    }
}
</script>

<style scoped>
.button{
    width: 90%;
    margin-left: 5%;
}
.name{
    width: 100%;
    height: 45px;
    display: block;
    line-height: 45px;
    text-align: center;
    position:relative;
    margin-top: 30%;
    font-size: 22px;
}
.box-card {
    width: 30%;
    margin-left: 8%;
    height: 250px;
}
</style>