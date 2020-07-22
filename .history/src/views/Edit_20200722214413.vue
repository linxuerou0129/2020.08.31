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
        <el-tab-pane label="帐号安全设置" class="safeSetting">
          <div class="cardS">
            <p>更改密码</p>
            <el-form :model="forgetIt"  ref="forgetIt" status-icon :rules="rules">
              <el-form-item label="当前邮箱验证码" prop="check">
                <el-input v-model="forgetIt.check"></el-input>
                <el-button size="mini" @click="submitEmail" round>获取验证码</el-button>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="forgetIt.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="forgetIt.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('forgetIt')">更改密码</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="verticalBar"></div>
          <div class="cardS">
            <p>更改邮箱</p>
            <el-form>
            <el-form-item
              prop="email"
              label="新邮箱"
              :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]"
            >
                <el-input v-model="forgetIt.email"></el-input>
                <el-button size="mini" @click="submitEmail" round>获取验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码" prop="check">
              <el-input v-model="forgetIt.check"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('forgetIt')">更改邮箱</el-button>
            </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>
.verticalBar {
  width: 1px;
  height: 300px;
  background: #8c939d;
  display: inline-block;
  margin-top: 31px;
  vertical-align: top;
  margin-right: 29px;
  margin-left: 30px;
}
.cardS{
  position: relative;
  width: 45%;
}
.safeSetting{
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
}
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
import { Message } from 'element-ui';
import axios from 'axios'
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
      reUrl:"",
      imageUrl:"",
      forgetIt: {
          email:'',
          pass:'',
          checkPass:'',
          check:''
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
        this.reUrl=res.icon;
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
            axios.post('http://47.107.243.207/api/edit_user_info', {
                edit_name:this.edit.name,
                edit_file:this.reUrl,
                edit_sex:this.edit.sex
              })
            .then((response) =>{
              console.log(response.data);
              location. reload();
            })
            .catch(function (error) {
              console.log(error);
            });
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
      submitEmail(){
        var reg = /^[a-zA-Z0-9]+@[a-z0-9]{2,5}\.[a-z]{2,3}(\.[a-z]{2,3})?$/;
        var result = reg.test(this.forgetIt.email);
        if(this.forgetIt.email==''){
          this.$message({
                    message: '邮箱不可为空',
                    type: 'warning'
                });
        }
        else if(!result){
          this.$message({
                    message: '邮箱输入有误',
                    type: 'warning'
                });
        }
        else{
          /*axios.post('http://47.107.243.207/api/send_email', {
              register_email: this.formZhuce.email
            })
          .then((response)=> {
            console.log(response.data);
            Message.success('发送成功，请注意查收')
          })
          .catch(function (error) {
            console.log(error);
          });*/
        }
      },
  },
   created(){
      axios({
            url:'http://47.107.243.207/api/get_user_info',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                 this.reUrl=response.data.头像;
                 this.imageUrl="http://47.107.243.207/api"+response.data.头像;
                 this.edit.name=response.data.用户名;
                 this.edit.sex=response.data.性别;
                 this.forgetIt.email=response.data.账号;
            })
            .catch(function(error){
                console.log(error);
            });
    }
}
</script>