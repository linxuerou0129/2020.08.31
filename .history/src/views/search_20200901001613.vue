<template>
<el-pagination
    class="pageDepart"
    layout="prev, pager, next"
    :total="50">
</el-pagination>
</template>

<style scoped>
.pageDepart{
    position:absolute;
    bottom:10px;
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items:center
}
</style>