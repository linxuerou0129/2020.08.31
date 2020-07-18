<template>
<div class="content">
<el-card class="box-card">
  <el-form :model="forgetIt"  ref="forgetIt" status-icon :rules="rules">
    <el-form-item
      prop="email"
      label="邮箱"
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
</el-card>
</div>
</template>

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
          ],
          check:[
            { required: true, message: '请输入验证码', trigger: 'blur'},
            { min: 4, max: 4, message: '长度为4个字符', trigger: 'blur' }
          ]
        }
    }
  },
  methods:{
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

<style scoped>
.content{
  width: 100%;
   top: 11.3%;
  
    bottom:0;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
  background-color:250,250,250;
}
.box-card {
  position: relative;
  top: 10%;
  left: 15%;
  width: 70%;
}
</style>