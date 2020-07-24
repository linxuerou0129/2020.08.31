<template>
  <div class="content">
    <div class="carousel">
      <el-carousel :interval="5000" direction="vertical" height="500px">
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
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable class="input">
      </el-input>
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
.input{
  width: 90%;
  left: 5%;
  top: 18%;
}
.search{
  position:fixed;
  height: 10%;
  width: 50%;
  background-color: black;
  z-index: 9999;
  opacity: 50%;
  top: 30%;
  left: 25%;
  border-radius: 45%;
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
  z-index: 9;
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