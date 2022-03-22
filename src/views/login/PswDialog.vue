<template>
  <el-dialog title="忘记密码" width="420px" class="settingDialog" :visible.sync="isActive" :before-close="dialogClose" append-to-body>
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="110px">
      <el-form-item label="手机号码" prop="mobile" class="row">
        <el-input v-model="temp.mobile" :maxlength="11" placeholder="手机号码" />
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode" class="row phoneDialogCode">
        <el-input v-model="temp.verifyCode" :maxlength="6" placeholder="验证码" />
        <div :class="{code:true,disabled:!show}" @click="sendCode">
          {{ text }}
        </div>
      </el-form-item>
      <el-form-item label="重置密码" prop="newPassword" class="row">
        <el-input v-model="temp.newPassword" type="password" placeholder="重置密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword" class="row">
        <el-input v-model="temp.rePassword" type="password" placeholder="确认密码" />
      </el-form-item>
      <el-form-item label="" label-width="56px" class="row">
        6-12位字母和数字组合,区分大小写,不含特殊符号
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click.native="updateData">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { generateMobileCode, forgetPassword } from '@/api/demo/login'
import { mapGetters } from 'vuex'
import { validatPhone, validatPassword } from '@/plugin/validate'

export default {
  name: 'PswDialog',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  },
  data() {
    const phoneCheckValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码 '))
      } else if (!validatPhone(value)) {
        callback(new Error('请输入正确的手机号码 '))
      } else {
        callback()
      }
    }
    const checkCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空 '))
      } else if (value.length !== 6) {
        callback(new Error('请输入6位验证码 '))
      } else {
        callback()
      }
    }
    const passwordCheckValidate = (rule, value, callback) => {
      if (value !== this.temp.newPassword) {
        callback(new Error('两次密码不匹配'))
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
      if (!validatPassword(value)) {
        callback(new Error('密码只能包含数字和字母'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      temp: {
        mobile: '13466779908',
        verifyCode: '111111',
        newPassword: '',
        rePassword: ''
      },
      show: true,
      count: '',
      timer: null,
      rules: {
        mobile: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { validator: phoneCheckValidate, trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '重置密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          { validator: pswCheck, trigger: 'blur' },
          { validator: newPasswordCheckValidate, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          { validator: passwordCheckValidate, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ]),
    text() {
      return this.count > 0 ? this.count + 's 后重获取' : '获取验证码'
    }
  },
  methods: {
    // 发送验证码
    sendCode() {
      this.$refs['dataForm'].validateField('mobile', (valid) => {
        if (!valid) {
          if (this.show) {
            const tempData = {}
            tempData.mobile = this.temp.mobile
            // tempData.node = 'change_binding_phone'
            generateMobileCode(tempData).then(response => {
              const TIME_COUNT = 60
              if (!this.timer && response.data) {
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
    dialogClose(done) {
      this.$refs['dataForm'].clearValidate()
      this.resetTemp()
      this.toggleClick()
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          const tempData = Object.assign({}, this.temp)
          forgetPassword(tempData).then(response => {
            this.loading = false
            this.dialogClose()
            // this.$store.dispatch('ChangeRoles', this.$store.getters.token).then(() => {
            //   this.dialogClose()
            // })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    resetFields() {
      this.resetTemp()
    },
    resetTemp() {
      this.temp = {
        mobile: '13466779908',
        verifyCode: '111111',
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

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
