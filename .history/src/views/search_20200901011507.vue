<template>
<div class="content">
    <p class="gray">以下为您找到56条关于“福州”的游记</p>
    <div class="search">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable class="input">
        <el-button type="primary" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-pagination
    class="pageDepart"
    layout="prev, pager, next"
    hide-on-single-page="true"
    :total="56">
    </el-pagination>
</div>
</template>

<style scoped>
.input{
  width: 29%;
  left: 5%;
  top: 18%;
}
.search{
  height: 10%;
  width: 50%;
  background-color: black;
  z-index: 9999;
  opacity: 50%;
  top: 80%;
  left: 25%;
  border-radius: 5px;
   display: -webkit-flex; /* Safari */
  display: flex;
    flex-direction: row;
}
.gray{
    color:#b1b2bb;
    font-size: 11px;
    margin-left: 20%;
}
.content{
    width: 100%;
   top: 11.3%;
  
    bottom:0;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
}
.pageDepart{
    text-align: center; 
}
</style>