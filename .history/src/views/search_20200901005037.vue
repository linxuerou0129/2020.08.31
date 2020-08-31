<template>
<div class="pageDepart">
    <el-pagination
    layout="prev, pager, next"
    hide-on-single-page="true"
    :total="20">
    </el-pagination>
</div>
</template>

<style scoped>
.pageDepart{
    position:absolute;
    bottom:10px;
    margin: 0 auto; 
}
</style>