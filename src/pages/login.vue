<template>
  <div class="login">
    <div class="loginContainer">
      <el-form :model="loginForm"
               status-icon
               :rules="rules"
               ref="loginForm"
               label-width="100px"
               class="demo-loginForm">
        <el-form-item label="用户名"
                      prop="username">
          <el-input type="text"
                    v-model="loginForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="text"
                    v-model="loginForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    // 校验用户名
    var validateUsername = (rule, value, callback) => {
      // 用户名正则，4到16位（字母，数字，下划线，减号）
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
      if (!uPattern.test(value)) {
        console.log(123)
        callback(new Error('请输入用户名4到16位（字母，数字，下划线，减号）'))
      } else {
        callback()
      }
    }
    // 校验用户密码
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
