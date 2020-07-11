<template>
<div id="app">
<el-menu :default-active="$route.path" mode="horizontal" @select="handleSelect" text-color="#FCDAA9" active-text-color="#f8b600" router>
  <img src="./assets/logo.png" width="55" class="logo">
  <img src="./assets/tittle.png" width="270">
  <el-menu-item index="/" class="head1"><strong>首页</strong></el-menu-item>
  <el-submenu class="head3" v-if="login" index="/Edit">
    <template slot="title">
      <el-avatar :src="circleUrl"></el-avatar>
    </template>
    <el-menu-item index="/Edit">
      <!--（个人信息设置与账号设置）-->
      我的设置
    </el-menu-item>
    <el-menu-item index="/Published">
      我的发布
    </el-menu-item>
    <el-menu-item index="/MyCollect">
      我的收藏
    </el-menu-item>
    <el-menu-item index="/Message">
      消息中心
    </el-menu-item>
    <el-menu-item  @click="logout">
      退出
    </el-menu-item>
  </el-submenu>
  <el-submenu v-if="!login"  class="head4">
    <template slot="title">
      <strong>登录/注册</strong>
    </template>
    <el-menu-item @click="dialogFormVisible = true">
      <!--<el-button type="text" @click="setFormShow = true">修改信息</el-button>-->
      注册
    </el-menu-item>
    <el-menu-item @click="loginFormShow = true">
      <!--<el-button type="text" @click="logout">退出</el-button>-->
      登录
    </el-menu-item>
  </el-submenu>
</el-menu>
<router-view></router-view>
<el-dialog title="注册" :visible.sync="dialogFormVisible">
  <el-form :model="formZhuce"  ref="formZhuce" status-icon :rules="rules">
    <el-form-item
      prop="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]"
    >
      <el-input v-model="formZhuce.email"></el-input>
      <el-button size="mini" @click="submitEmail" round>获取验证码</el-button>
    </el-form-item>
    <el-form-item label="验证码">
      <el-input v-model="formZhuce.check"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称">
      <el-input v-model="formZhuce.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="formZhuce.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="formZhuce.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('formZhuce')">注册</el-button>
      <el-button @click="dialogFormVisible = false">取消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
<el-dialog title="登录" :visible.sync="loginFormShow">
  <el-form :model="formLogin"  ref="formLogin" status-icon :rules="rules">
    <el-form-item
      prop="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]"
    >
      <el-input v-model="formLogin.email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="formLogin.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <a href="/Forget">忘记密码</a>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="loginIt('formLogin')">登录</el-button>
      <el-button @click="loginFormShow= false">取消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
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
</div>
</template>
<style>
    .el-menu--horizontal>.el-submenu .el-submenu__title {
        font-size: 17px;
    }
</style>
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
.logo{
  position: fixed;
  top: 1%;
  left: 3%;
}
.head1{
  position: relative;
  left: 81%;
  font-size: 18px;
}
.head3{
  position: fixed;
  right:4.5%;
  top: 1.3%;
  font-size: 18px;
}
.head4{
  position: fixed;
  right: 2%;
  top: 1.5%;
  font-size: 18px!important;
}
</style>

<script>
import { Message } from 'element-ui';
import axios from 'axios'
export default {
    data() {
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
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        activeIndex: '1',
        activeIndex2: '1',
        login:false,
        dialogFormVisible:false,
        loginFormShow:false,
        setFormShow:false,
        formZhuce: {
          email:'',
          pass:'',
          checkPass:'',
          name:'',
          check:''
        },
        formLogin:{
          email:'',
          pass:''
        },
        imageUrl: '',
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.formZhuce.name==''||this.formZhuce.check==''||this.imageUrl==''){
              this.$message({
                    message: '请检查是否填写完整',
                    type: 'warning'
                });
            }
            else{
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
          } 
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitEmail(){
        var reg = /^[a-zA-Z0-9]+@[a-z0-9]{2,5}\.[a-z]{2,3}(\.[a-z]{2,3})?$/;
        var result = reg.test(this.formZhuce.email);
        if(this.formZhuce.email==''){
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
      loginIt(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*axios.post('http://47.107.243.207/api/login', {
                login_id: this.formLogin.email,
                login_password:this.formLogin.pass
              })
            .then((response) =>{
              console.log(response.data);
              if(response.data.status=="success"){
                this.loginFormShow=false;
                this.login=true;
                Message.success('登录成功');
              }
              else{
                Message.error('登录失败，请重新登录');
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
      logout(){
        /*axios.get('http://47.107.243.207/api/logout')
            .then((response)=>{
              console.log(response.data);
              this.login=false;
              Message.success('退出成功');
            })
            .catch(function(error){
                console.log(error);
            });*/
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
          } 
    },
    watch:{
      login:function(val,oldVal){
           if(val==true){
             /*axios({
              url:'http://47.107.243.207/api/get_user_info',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                this.circleUrl=response.data.头像;
            })
            .catch(function(error){
                console.log(error);
            });*/
           }
        }
    },
    /*mounted(){
      axios({
            url:'http://47.107.243.207/api/get_user_info',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                this.login=true
                this.circleUrl=response.data.头像;
            })
            .catch(function(error){
                console.log(error);
            });
    }*/
  }
</script>