// polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// Vue
import Vue from 'vue'
import App from './App.vue'

// 多国语
import i18n from './i18n'

// 路由和状态管理器
import router from './router'
import store from './store'

// 核心功能
import Admin from '@/plugin/admin'

// 组织结构树组件
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'

// 图片查看组件
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

// 核心功能
Vue.use(Admin)

// 图片查看组件
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

// 组织结构树组件
Vue.use(VOrgTree)

new Vue({
  router,
  store,
  i18n,
  mounted() {
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('admin/ua/get')
    // document.dispatchEvent(new Event('render-event'))
  },
  render: h => h(App)
}).$mount('#app')
