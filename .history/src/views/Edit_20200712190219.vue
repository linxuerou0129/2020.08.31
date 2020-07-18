<template>
  <div class="content">
    <el-card class="card">
      <el-tabs tab-position="left">
        <el-tab-pane label="用户信息设置">
          <el-form status-icon >
            <p>修改个人信息</p>
            <el-form-item label="用户昵称">
              <el-input v-model="edit.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="edit.sex" label="男">男</el-radio>
              <el-radio v-model="edit.sex" label="女">女</el-radio>
              <el-radio v-model="edit.sex" label="保密">保密</el-radio>
            </el-form-item>
            <p>设置头像</p>
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
              </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="帐号安全设置">
          <div>
            <p>更改密码</p>
            <el-form :model="forgetIt"  ref="forgetIt" status-icon :rules="rules">
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="forgetIt.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="forgetIt.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('forgetIt')">保存修改</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div>
            <p>更改邮箱</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>
.avatar-uploader {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
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

<script>
export default {
  data(){
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formZhuce.checkPass !== '') {
            this.$refs.formZhuce.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formZhuce.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return{
      edit:{
        name:"",
        sex:"保密"
      },
      imageUrl:"",
      forgetIt: {
          pass:'',
          checkPass:'',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
    }
  },
  methods:{
    handleAvatarSuccess(res) {
        console.log(res);
        this.imageUrl = "http://47.107.243.207/api"+res.icon;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      save() {
            /*axios.post('http://47.107.243.207/api/edit_user_info', {
                edit_name:this.formZhuce.name,
                edit_file:this.imageUrl,
              })
            .then((response) =>{
              console.log(response.data);
                this.circleUrl=response.data.头像
                this.setFormShow= false;
                Message.success('修改成功');
                location. reload();
            })
            .catch(function (error) {
              console.log(error);
            });*/
          } ,
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              /*axios.post('http://47.107.243.207/api/register', {
                register_email: this.formZhuce.email,
                register_name:this.formZhuce.name,
                register_password:this.formZhuce.pass,
                file:this.imageUrl,
                register_code:this.formZhuce.check
              })
            .then((response) =>{
              console.log(response.data);
              if(response.data.status=="success"){
                this.dialogFormVisible = false;
                Message.success('注册成功');
              }
              else{
                Message.error(response.data.status)
              }
            })
            .catch(function (error) {
              console.log(error);
            });*/  
          } 
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
}
</script>