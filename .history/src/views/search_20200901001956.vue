<template>
<el-pagination
    class="pageDepart"
    layout="prev, pager, next"
    hide-on-single-page="true"
    :total="20">
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