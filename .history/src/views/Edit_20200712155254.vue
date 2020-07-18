<template>
  <div class="content">
    <el-card class="card">
      <el-tabs tab-position="left" style="height: 200px;">
        <el-tab-pane label="用户信息设置">
          <el-dialog title="修改信息" :visible.sync="setFormShow">
            <el-form status-icon >
              <el-form-item label="用户昵称">
              <el-input v-model="formZhuce.name"></el-input>
            </el-form-item>
            <p>修改头像</p>
             <el-upload
                class="avatar-uploader"
                action="http://47.107.243.207/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <br>
              <el-form-item>
                <el-button type="primary" @click="save">保存修改</el-button>
                <el-button @click="setFormShow= false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="帐号安全设置">帐号安全设置</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>
.card{
  position: relative;
  width: 80%;
  left: 10%;
  top: 10%;
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