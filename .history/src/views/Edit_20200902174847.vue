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
                action="http://106.75.157.168:5657/api/upload"
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
              <el-form-item label="" prop="check">
                <el-button size="mini" @click="submitEmail" round>验证邮箱</el-button>
                <el-input v-model="forgetIt.check"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="forgetIt.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="forgetIt.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="savePass('forgetIt')">更改密码</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="verticalBar"></div>
          <div class="cardS">
            <p>更改邮箱</p>
            <el-form :model="email"  ref="email" status-icon :rules="rules">
            <el-form-item
              prop="email"
              label="新邮箱"
              :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]"
            >
                <el-input v-model="email.email"></el-input>
            </el-form-item>
            <el-form-item label="" prop="check">
              <el-button size="mini" @click="submitEmailNew" round>验证新邮箱</el-button>
              <el-input v-model="email.check"></el-input>
            </el-form-item>
            <el-form-item label="" prop="check">
              <el-button size="mini" @click="submitEmailOld" round>验证旧邮箱</el-button>
              <el-input v-model="email.checkT"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveEmail('email')">更改邮箱</el-button>
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
  height: 400px;
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
          if (this.forgetIt.checkPass !== '') {
            this.$refs.forgetIt.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.forgetIt.pass) {
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
      email:{
        email:'',
        check:'',
        checkT:""
      },
      forgetIt: {
          email:'',
          pass:'',
          checkPass:'',
          check:'',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          check:[
            { required: true, message: '请输入验证码', trigger: 'blur'},
            { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
          ]
        }
    }
  },
  methods:{
    handleAvatarSuccess(res) {
        console.log(res);
        this.reUrl=res.icon;
        this.imageUrl = "http://106.75.157.168:5657/api"+res.icon;
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
            axios.post('http://106.75.157.168:5657/api/edit_user_info', {
                edit_name:this.edit.name,
                edit_file:this.reUrl,
                edit_sex:this.edit.sex
              })
            .then((response) =>{
              console.log(response.data);
              location.href="/Published"
            })
            .catch(function (error) {
              console.log(error);
            });
          } ,
      savePass(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              axios.post('http://106.75.157.168:5657/api/fotget_password', {
                fotget_email: this.forgetIt.email,
                fotget_password:this.forgetIt.pass,
                fotget_code:this.forgetIt.check
              })
            .then((response) =>{
              console.log(response.data);
              if(response.data.status=="success"){
                Message.success('修改成功');
              }
              else if(response.data.status=="fail"){
                Message.success('修改失败');
              }
              else{
                Message.error(response.data.status)
              }
            })
            .catch(function (error) {
              console.log(error);
            }); 
          } 
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      saveEmail(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.email.email+this.email.checkT+this.email.check);
              axios.post('http://106.75.157.168:5657/api/change_email', {
                change_email: this.email.email,
                change_code:this.email.checkT,
                change_code_new:this.email.check
              })
            .then((response) =>{
              console.log(response.data);
              if(response.data.status=="success"){
                Message.success('修改成功');
                this.forgetIt.email=this.email.email;
              }
              else{
                Message.error(response.data.status)
              }
            })
            .catch(function (error) {
              console.log(error);
            }); 
          } 
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitEmail(){
          axios.post('http://106.75.157.168:5657/api/send_email', {
              email: this.forgetIt.email,
              type:1
            })
          .then((response)=> {
            console.log(response.data);
            Message.success('发送成功，请注意查收')
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      submitEmailNew(){
          axios.post('http://106.75.157.168:5657/api/send_email', {
              email: this.email.email,
              type:3
            })
          .then((response)=> {
            console.log(response.data);
            Message.success('已发送至新邮箱，请注意查收')
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      submitEmailOld(){
          axios.post('http://106.75.157.168:5657/api/send_email', {
              email: this.forgetIt.email,
              type:2
            })
          .then((response)=> {
            console.log(response.data);
            Message.success('已发送至旧邮箱，请注意查收')
          })
          .catch(function (error) {
            console.log(error);
          });
      },
  },
   created(){
      axios({
            url:'http://106.75.157.168:5657/api/getinfo2',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                 this.reUrl=response.data.头像;
                 this.imageUrl="http://106.75.157.168:5657/api"+response.data.头像;
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