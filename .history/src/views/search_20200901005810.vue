<template>
<div class="content">
    <p></p>
    <el-pagination
    class="pageDepart"
    layout="prev, pager, next"
    hide-on-single-page="true"
    :total="20">
    </el-pagination>
</div>
</template>

<style scoped>
.content{
    width: 100%;
   top: 11.3%;
  
    bottom:0;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
  background-color:#FAFAFA;
}
.pageDepart{
    text-align: center; 
}
</style>