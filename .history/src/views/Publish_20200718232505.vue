<template>
<div class="content">
    <div class="head">
        <img src="../assets/xuhua.jpg" width="100%" height="350" style="opacity:0.3;z-index:9">
        <div class="addP">
            <img src="../assets/addP.png">
        </div>
    </div>
</div>
</template>

<style scoped>
.head{
    position: relative;
    height: 20%;
}
.addP{
    z-index: 999;
    position: relative;
    top: 10px;
}
.content{
  width: 100%;
   top: 11.3%;
  
    bottom:0;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
  background-color: #FAFAFA;
}
</style>