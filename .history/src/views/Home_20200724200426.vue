<template>
  <div class="content">
    <div style="z-index: 9;">
      <el-carousel class="carousel" :interval="5000" direction="vertical" height="500px">
      <el-carousel-item>
        <div class="head">
          <strong>放下偏见，原来你是宝藏杭州（附杭州15个小众打卡景点）</strong>
          <p style="font-size: 16px;">-- 柠檬LQ (北京) </p>
        </div>
        <img class="photo" src="../assets/test1.jpg">
      </el-carousel-item>
      <el-carousel-item>
      </el-carousel-item>
      <el-carousel-item>
      </el-carousel-item>
      <el-carousel-item>
      </el-carousel-item>
    </el-carousel>
    </div>
    <div class="search">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>
.search{
  position:fixed;
  height: 100px;
  background-color: black;
  z-index: 9999;
  opacity: 50%;
  top: 30%;
}
.photo{
  z-index: 9;
}
.head{
  z-index: 999;
    position: absolute;
  color: white;
  font-size: 22px;
  left: 7%;
  top: 6%;
}
.carousel{
  position: relative;
  top: 4%;
  width: 96%;
  left: 2%;
}
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
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>