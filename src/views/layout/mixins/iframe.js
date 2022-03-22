export default {
  components: {
    'admin-panel-iframe': () => import('../components/PanelIframe')
  },
  data() {
    return {
      iframeActive: this.$route.meta.showIframe || false
    }
  },
  watch: {
    $route(res) {
      this.iframeActive = res.meta.showIframe || false
    }
  }
}
