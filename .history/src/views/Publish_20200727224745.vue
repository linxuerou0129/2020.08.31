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
  <div 
            style="display: -webkit-flex; 
            /* Safari */display: flex;
            flex-direction: row;
            margin-bottom:10px">
                <el-input v-model="input" placeholder="请输入图片备注" style="margin-right:10px"></el-input>
                <el-button type="primary">确定</el-button>
            </div>
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
            input:'',
            image: [],
            fileList:{}
        }
    },
    methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadSuccess(res,file,fileList){
           /*this.image.push({
                image: "http://47.107.243.207/api"+res.icon,
                remark: ""
            });
            console.log(this.image)*/
            this.fileList=fileList;
            console.log=(this.fileList);
      },
      handleExceed(){
        this.$message({
          message: '至多只能上传九张',
          type: 'warning'
        });
      }
    }
}
</script>

<style scoped>
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
  background-color: #FAFAFA;
}
</style>