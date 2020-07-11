<template>
  <div>
<el-dialog title="注册">
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
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>
