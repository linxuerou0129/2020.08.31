<template>
<div id="app">
<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" text-color="#FCDAA9" active-text-color="#f8b600" router>
  <img src="./assets/logo.png" width="55" class="logo">
  <img src="./assets/tittle.png" width="270">
  <el-menu-item index="/" class="head1"><strong>首页</strong></el-menu-item>
  <el-submenu class="head3" v-if="login" index="/Edit">
    <template slot="title">
      <el-avatar :src="circleUrl"></el-avatar>
    </template>
    <el-menu-item index="/Edit">
      我的设置
    </el-menu-item>
    <el-menu-item index="/Publish">
      发布游记
    </el-menu-item>
    <el-menu-item index="/Published">
      个人中心
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
  <el-submenu v-if="!login"  class="head4" index=1>
    <template slot="title">
      <strong>登录/注册</strong>
    </template>
    <el-menu-item @click="dialogFormVisible = true">
      注册
    </el-menu-item>
    <el-menu-item @click="loginFormShow = true">
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
    <el-form-item label="验证码" prop="check">
      <el-input v-model="formZhuce.check"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="name">
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
        circleUrl: "http://106.75.157.168:5657/api/static/touxiang.png",
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
          ],
          check:[
            { required: true, message: '请输入验证码', trigger: 'blur'},
            { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请输入用户昵称', trigger: 'blur' },
            { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              axios.post('http://106.75.157.168:5657/api/register', {
                register_email: this.formZhuce.email,
                register_name:this.formZhuce.name,
                register_password:this.formZhuce.pass,
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
            });
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
          axios.post('http://106.75.157.168:5657/api/send_email', {
              email: this.formZhuce.email,
              type:6
            })
          .then((response)=> {
            console.log(response.data);
            Message.success('发送成功，请注意查收')
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },
      loginIt(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://106.75.157.168:5657/api/login', {
                login_id: this.formLogin.email,
                login_password:this.formLogin.pass
              })
            .then((response) =>{
              console.log(response.data);
              if(response.data.status=="success"){
                this.loginFormShow=false;
                this.login=true;
                Message.success('登录成功');
                location.href="/";
              }
              else{
                Message.error('登录失败，请重新登录');
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
      logout(){
        axios.get('http://106.75.157.168:5657/api/logout')
            .then((response)=>{
              console.log(response.data);
              this.login=false;
              location.href="/";
              Message.success('退出成功');
            })
            .catch(function(error){
                console.log(error);
            });
      }, 
    },
    watch:{
      login:function(val,oldVal){
           if(val==true){
             axios({
              url:'http://106.75.157.168:5657/api/getinfo',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                this.circleUrl="http://106.75.157.168:5657/api"+response.data.头像;
            })
            .catch(function(error){
                console.log(error);
            });
           }
        }
    },
    mounted(){
      axios({
            url:'http://106.75.157.168:5657/api/getinfo',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                this.login=true
                this.circleUrl="http://106.75.157.168:5657/api"+response.data.头像;
                console.log("http://106.75.157.168:5657/api"+response.data.头像)
            })
            .catch(function(error){
                console.log(error);
            });
    }
  }
</script>