<template>
  <div class="content">
    <el-carousel class="carousel" :interval="5000" direction="vertical" height="500px">
      <el-carousel-item>
        <img src="../assets/test1.jpg">
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