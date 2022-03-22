import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('admin/app', [
      'routeRefresh'
    ]),
    onChangeLocale(command) {
      this.$i18n.locale = command
      let message = `当前语言：${this.$t('_name')} [ ${this.$i18n.locale} ]`
      if (['TRAVIS', 'NETLIFY'].includes(process.env.VUE_APP_BUILD_MODE)) {
        message = [
          `当前语言：${this.$t('_name')} [ ${this.$i18n.locale} ]`
        ].join('<br/>')
      }
      this.$notify({
        title: '语言变更',
        dangerouslyUseHTMLString: true,
        message
      })
      this.routeRefresh(this.$route.name)
    }
  }
}
