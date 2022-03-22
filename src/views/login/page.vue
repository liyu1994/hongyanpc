<template>
  <div class="page-login">
    <div class="page-login--layer">
      <div class="system-name">红岩管理后台</div>
      <div
        class="page-login--content"
        flex="dir:top main:center cross:center box:justify"
      >
        <div class="login-container" flex="dir:top main:center cross:center">
          <div class="login-form">
            <component :is="currentRole" :phone="phone" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageLogin from './components/login'
import pagePsw from './components/psw'

export default {
  name: 'Login',
  components: {
    pageLogin,
    pagePsw
  },
  data() {
    return {
      currentRole: 'pageLogin',
      phone: ''
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    PageForgetPassword(page, phone) {
      this.currentRole = page
      this.phone = phone
    }
  }
}
</script>
