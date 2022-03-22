import util from '@/libs/util'

export default {
  install(Vue, options) {
    // 动态添加路由
    Vue.prototype.$addRoute = function(opts = {}) {
      util.route.setRoutes(opts)
    }
  }
}
