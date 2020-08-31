<template>
<div>
    <el-pagination
    layout="prev, pager, next"
    hide-on-single-page="true"
    :total="20"
    class="pageDepart">
    </el-pagination>
</div>
</template>

<style scoped>
.pageDepart{
    position:absolute;
    bottom:10px;
    text-align: center;
}
</style>