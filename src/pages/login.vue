<template>
  <div class="login">
      <div class="left"></div>
    <div class="loginContainer">
      <h1 class="title">万锋管理系统</h1>
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
    <video class="bg_video"
           muted
           src="../assets/video/bg_video.mp4"
           autoplay
           loop
           preload="auto"></video>
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
<style scoped lang="less">
  .login {
    height: 100%;
    width: 100%;
    background: url("../assets/imgs/bg.jpg");
    overflow: hidden;
  }

  .loginContainer {
    position: relative;
    z-index: 9;
    width: 25rem;
    height: 30.47619048rem;
    position: absolute;
    top: 50%;
    left: 75%;
    /* -webkit-transform: translate(-50%, -50%); */
    transform: translate(-50%, -50%);
    border-radius: 11px;
    background: rgba(83, 107, 182, 0.46);
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
    .title {
      color: #fff;
      margin-top: 100px;
      margin-bottom: 50px;
    }
    .el-button.el-button--primary {
      width: 100%;
      background: linear-gradient(90deg, #1596fb, #002dff);
    }
    .bg_video {
      display: block;
      margin: auto;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.5;
    }

  }
   .left {
      width: 50%;
      height: 100%;
      background-image: url("../assets/imgs/bg2.png");
      background-repeat:no-repeat;
      background-size:50%;
      // float: left;
      position:absolute;
      opacity: .7;
      background-position: 60% 65%;
    }
  .el-form.demo-loginForm {
    padding: 0 50px 0 0;
  }
</style>
