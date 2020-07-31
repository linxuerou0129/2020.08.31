<template>
<div class="content">
    <div class="head">
        <img src="../assets/xuhua.jpg" width="100%" height="300" style="opacity:0.3;z-index:9">
        <div  class="addP" @click="showDialog=true">
            <img src="../assets/addP.png" width="120">
            <div style="margin-left:10px">
                <p class="p1">上传图片</p>
                <p class="p2">最多可上传九张</p>
            </div>
        </div>
        <div class="input">
            <el-input
            placeholder="请输入标题"
            v-model="tittle"
            maxlength="40"
            show-word-limit
            clearable>
            </el-input>
        </div>
    </div>
    <div class="zhengWen">
      <div style="width:70%">
        <el-input
          type="textarea"
          :autosize="{ minRows: 20}"
          placeholder="请输入正文"
          v-model="textarea">
        </el-input>
      </div>
      <div>
        <div class="information">
          <div>
            <p>出发日期</p>
            <el-date-picker
            v-model="data"
            type="date"
            placeholder="选择出发日期">
            </el-date-picker>
          </div>
          <div>
            <p>出行天数</p>
            <el-input-number v-model="dayNum" :min="1" label="输入出行天数"></el-input-number>
          </div>
          <div>
            <p>人物</p>
            <el-autocomplete
              class="inline-input"
              v-model="people"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
          <div>
            <p>人均费用</p>
            <el-input-number v-model="money" :min="0" :step="100" label="输入人均费用"></el-input-number>
          </div>
        </div>
        <div>
          <el-radio v-model="radio" label="0">国内</el-radio>
          <el-radio v-model="radio" label="1">国外</el-radio>
        </div>
      </div>
    </div>
  <el-dialog title="上传图片" :visible.sync="showDialog">
    <el-upload
      action="http://47.107.243.207/api/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :limit="9"
      :on-exceed="handleExceed">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="预览/添加备注">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-dialog>
</div>
</template>

<script>
export default {
    data(){
        return{
            tittle:'',
            showDialog:false,
            dialogImageUrl: '',
            dialogVisible: false,
            showEdit:false,
            image: [],
            fileList:{},
            textarea:'',
            data:'',
            dayNum:1,
            people:'',
            restaurants: [],
            money:0,
            radio:0,
        }
    },
    methods:{
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "家人/父母"},
          { "value": "情侣/夫妻" },
          { "value": "亲子"},
          { "value": "朋友"}
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList=fileList;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadSuccess(res,file,fileList){
            this.fileList=fileList;
            console.log(this.fileList);
      },
      handleExceed(){
        this.$message({
          message: '至多只能上传九张',
          type: 'warning'
        });
      },
    },
    mounted(){
      this.restaurants = this.loadAll();
    }
}
</script>

<style scoped>
.information{
  width: 125%;
  margin-left: 10%;
  padding: 10%;
  border-radius: 5px;
  background-color: #fafafa;
}
.zhengWen{
  margin:3% 5% ;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
}
.input{
    z-index: 999;
    position: absolute;
    width: 80%;
    top: 40%;
    left: 11%;
}
.p2{
    color: gray;
}
.p1{
    font-size: 25px;
}
.addP{
    z-index: 999;
    position: absolute;
    top: 12%;
    left: 40%;
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
  background-color:#fff;
}
</style>