<template>
  <el-form ref="loginForm" auto-complete="on" :model="loginForm" :rules="loginRules" hide-required-asterisk label-position="right" label-width="auto">
    <div class="login-box">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="username" label="账号">
        <el-input v-model.trim="loginForm.username" name="username" type="text" auto-complete="off" placeholder="请输入账号" @keyup.enter.native="handleLogin" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model.trim="loginForm.password" name="password" :type="passwordType" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <div style="margin-top: 20px">
        <el-checkbox v-model="isRemember">记住账号</el-checkbox>
      </div>
      <el-button type="primary" style="width:100%;margin-bottom:20px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex'
import { getLocale } from '@/locales'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      isRemember: false
    }
  },
  computed: {
    loginRules() {
      return {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    const username = localStorage.getItem('username')
    if (username) {
      this.isRemember = true
      this.loginForm.username = username
    }
  },
  beforeDestroy() {
  },
  methods: {
    ...mapActions('admin/account', [
      'login'
    ]),
    getLocale,
    forgetPassword() {
      this.$parent.PageForgetPassword('pagePsw', this.loginForm.username)
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    toggleClick() {
      this.showDialog = false
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 登录
          this.login(this.loginForm)
            .then(() => {
              if (this.isRemember) {
                localStorage.setItem('username', this.loginForm.username)
              } else {
                localStorage.clear('username')
              }
              this.loading = false
              const redirect = this.$route.query.redirect
              if (redirect) {
                // 重定向到指定的页面
                this.$router.replace(redirect)
              } else {
                // 重定向到开始路径
                this.$router.replace('/')
              }
            }).catch((res) => {
              this.loading = false
              if (res === 'psw') {
                this.showDialog = true
              }
            })
        } else {
          // 登录表单校验失败
          // this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>
