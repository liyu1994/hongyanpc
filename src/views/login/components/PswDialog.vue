<template>
  <el-dialog :title="getLocale('page_login_dialog_title')" width="420px" class="settingDialog" :visible.sync="isActive" :before-close="dialogClose" append-to-body>
    <el-form v-if="isActive" ref="dataForm" auto-complete="on" :rules="rules" :model="temp" label-position="right" label-width="auto">
      <el-form-item :label="getLocale('page_login_dialog_newPassword')" prop="newPassword" class="row">
        <el-input v-model="temp.newPassword" type="password" :placeholder="getLocale('public_password_placeholder')" />
      </el-form-item>
      <el-form-item :label="getLocale('page_login_dialog_rePassword')" prop="rePassword" class="row" style="margin-bottom: 0;">
        <el-input v-model="temp.rePassword" type="password" :placeholder="getLocale('public_password_placeholder')" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click.native="dialogClose">取消</el-button> -->
      <el-button type="primary" :loading="loading" @click.native="updateData">{{ getLocale('page_login_dialog_confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '@/libs/util'
import { getLocale } from '@/locales'
import { validPass } from '@/plugin/validate'
import { forceUpdatePwd } from '@/api/login'

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
      loading: false,
      temp: {
        mobile: '',
        verifyCode: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        newPassword: [
          { required: true, message: getLocale('page_login_dialog_check_password'), trigger: 'blur' },
          { min: 6, max: 16, message: getLocale('page_login_login_password_check_empty'), trigger: 'blur' },
          { validator: pswCheck, trigger: 'blur' },
          { validator: newPasswordCheckValidate, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: getLocale('page_login_dialog_check_password'), trigger: 'blur' },
          { min: 6, max: 16, message: getLocale('page_login_login_password_check_empty'), trigger: 'blur' },
          { validator: passwordCheckValidate, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    getLocale,
    dialogClose(done) {
      this.$refs['dataForm'].clearValidate()
      this.resetTemp()
      this.toggleClick()
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          // const tempData = Object.assign({}, this.temp)
          const tempData = {
            newpwd: util.md5(this.temp.newPassword),
            repwd: util.md5(this.temp.rePassword)
          }
          forceUpdatePwd(tempData).then(response => {
            this.loading = false
            this.$notify({
              title: getLocale('public_title_tips'),
              message: getLocale('page_login_dialog_success'),
              type: 'success',
              duration: 2000
            })
            setTimeout(() => {
              this.dialogClose()
            }, 2000)
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
        mobile: '',
        verifyCode: '',
        newPassword: '',
        rePassword: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
