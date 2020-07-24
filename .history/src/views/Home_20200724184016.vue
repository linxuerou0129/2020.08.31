<template>
  <div class="content">
    <el-carousel class="carousel" :interval="5000" direction="vertical" height="500px">
      <el-carousel-item>
        <div class="head">
          <p>放下偏见，原来你是宝藏杭州（附杭州15个小众打卡景点）</p>
          <br>
          <p>柠檬LQ (北京) </p>
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
.photo{
  z-index: 9;
}
.head{
  z-index: 999;
    position: absolute;
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