<template>
  <div id="app">
    <router-view ref="root" />
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'App',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created() {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle(val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
  // @import '~@/assets/styles/public-class.scss';
</style>
