<template>
<div class="content">
    <div class="head">
        <img src="../assets/xuhua.jpg" width="100%" height="350" style="opacity:0.3;z-index:9">
        <div  class="addP">
            <img src="../assets/addP.png" width="120">
            <div>
                <p class="p1">上传图片</p>
                <p class="p2">最多可上传九张</p>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.p2{
    color: gray;
}
.p1{
    font-size: 25px;
}
.addP{
    z-index: 999;
    position: absolute;
    top: 10%;
    display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
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