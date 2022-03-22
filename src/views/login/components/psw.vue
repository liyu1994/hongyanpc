<template>
  <el-form ref="dataForm" auto-complete="on" :model="temp" :rules="rules" hide-required-asterisk label-position="right" label-width="auto">
    <div class="psw-box">
      <div>
        <span class="link-type psw" @click="loginCheck">{{ getLocale('page_login_login_button') }}</span>
      </div>
      <div class="title-container">
        <h3 class="title">{{ getLocale('page_login_psw_title') }}</h3>
      </div>
      <el-form-item prop="mobile" :label="getLocale('page_login_psw_mobile')">
        <!-- <span class="text-container">手机号码</span> -->
        <el-input v-model.trim="temp.mobile" auto-complete="on" :placeholder="getLocale('page_login_psw_mobile_placeholder')" maxlength="11" />
      </el-form-item>
      <el-form-item prop="verifyCode" :label="getLocale('page_login_psw_verifyCode')">
        <!-- <span class="text-container">验证码</span> -->
        <el-input v-model="temp.verifyCode" :maxlength="6" auto-complete="on" :placeholder="getLocale('page_login_psw_verifyCode_placeholder')" />
        <div :class="{code:true,'link-type':true,disabled:!show}" @click="sendCode">{{ text }}</div>
      </el-form-item>
      <el-form-item prop="newPassword" :label="getLocale('page_login_dialog_newPassword')">
        <!-- <span class="text-container">新密码</span> -->
        <el-input v-model.trim="temp.newPassword" :type="passwordType" autocomplete="new-password" :placeholder="getLocale('public_password_placeholder')" maxlength="16" />
      </el-form-item>
      <el-form-item prop="rePassword" :label="getLocale('page_login_dialog_rePassword')">
        <!-- <span class="text-container">确认新密码</span> -->
        <el-input v-model.trim="temp.rePassword" :type="passwordType" auto-complete="off" :placeholder="getLocale('public_password_placeholder')" maxlength="16" />
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:20px;" :loading="loading" @click.native.prevent="updateData">确认</el-button>
    </div>
  </el-form>
</template>

<script>
import util from '@/libs/util'
import { getLocale } from '@/locales'
import { validatPhone, validPass } from '@/plugin/validate'
import { message, forgetPwd } from '@/api/login'

export default {
  props: {
    phone: {
      type: String,
      default: ''
    }
  },
  data() {
    const phoneCheckValidate = (rule, value, callback) => {
      if (!validatPhone(value)) {
        callback(new Error(getLocale('page_login_psw_mobile_check')))
      } else {
        callback()
      }
    }
    const checkCode = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error(getLocale('page_login_psw_verifyCode_check')))
      } else {
        callback()
      }
    }
    const passwordCheckValidate = (rule, value, callback) => {
      if (value !== this.temp.newPassword) {
        callback(new Error(getLocale('page_login_dialog_check_twoPassword')))
      } else {
        callback()
      }
    }
    const newPasswordCheckValidate = (rule, value, callback) => {
      if (value !== this.temp.rePassword && this.temp.rePassword) {
        this.$refs['dataForm'].validateField('rePassword')
      } else if (value === this.temp.rePassword && this.temp.rePassword) {
        this.$refs['dataForm'].validateField('rePassword')
        callback()
      }
    }
    const pswCheck = (rule, value, callback) => {
      if (!validPass(value)) {
        callback(new Error(getLocale('page_login_dialog_check_format')))
      } else {
        callback()
      }
    }
    return {
      temp: {
        mobile: '',
        verifyCode: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        mobile: [
          { required: true, message: getLocale('page_login_psw_mobile_check_empty'), trigger: 'blur' },
          { validator: phoneCheckValidate, trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: getLocale('page_login_psw_verifyCode_check'), trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: getLocale('page_login_dialog_check_password'), trigger: 'blur' },
          { min: 6, max: 16, message: getLocale('page_login_dialog_check_length'), trigger: 'blur' },
          { validator: pswCheck, trigger: 'blur' },
          { validator: newPasswordCheckValidate, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: getLocale('page_login_dialog_check_password'), trigger: 'blur' },
          { min: 6, max: 16, message: getLocale('page_login_dialog_check_length'), trigger: 'blur' },
          { validator: pswCheck, trigger: 'blur' },
          { validator: passwordCheckValidate, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false,
      show: true,
      count: '',
      timer: null
    }
  },
  computed: {
    text() {
      return this.count > 0 ? this.count + 's ' + getLocale('page_login_psw_verifyCode_countdown') : getLocale('page_login_psw_verifyCode_get')
    }
  },
  mounted() {
    Object.assign(this.temp, {
      mobile: this.phone,
      verifyCode: '',
      newPassword: '',
      rePassword: ''
    })
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    getLocale,
    loginCheck() {
      this.$parent.PageForgetPassword('pageLogin')
    },
    // 发送验证码
    sendCode() {
      this.$refs['dataForm'].validateField('mobile', (valid) => {
        if (!valid) {
          if (this.show) {
            const tempData = {}
            tempData.smsType = 1
            tempData.mobile = this.temp.mobile
            // tempData.node = 'change_binding_phone'
            message(tempData).then(response => {
              const TIME_COUNT = 60
              if (!this.timer && response.status === 200) {
                this.count = TIME_COUNT
                this.show = false
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--
                  } else {
                    this.show = true
                    clearInterval(this.timer)
                    this.timer = null
                  }
                }, 1000)
              }
            }).catch(() => {
              this.show = true
              this.count = ''
              clearInterval(this.timer)
              this.timer = null
            })
          }
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          // const tempData = Object.assign({}, this.temp)
          const tempData = {
            passwd: util.md5(this.temp.newPassword),
            rePasswd: util.md5(this.temp.rePassword),
            verifyMesDTO: {
              code: this.temp.verifyCode,
              mobile: this.temp.mobile,
              smsType: 1
            }
          }
          forgetPwd(tempData).then(response => {
            this.loading = false
            this.resetFields()
            this.loginCheck()
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    resetFields() {
      // this.$message({
      //   message: '密码重置成功，请登录！',
      //   type: 'success'
      // })
      this.$notify({
        title: getLocale('public_title_tips'),
        message: getLocale('page_login_dialog_success'),
        type: 'success',
        duration: 2000
      })
      this.resetTemp()
    },
    resetTemp() {
      this.temp = {
        mobile: '',
        verifyCode: '',
        newPassword: '',
        rePassword: ''
      }
      this.show = true
      this.count = ''
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>
