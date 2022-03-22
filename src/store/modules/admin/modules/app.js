// 设置文件
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 侧边栏收缩
    sidebar: setting.menu.sidebar,
    // 是否开启页面过度动画
    active: setting.transition.active,
    // 刷新router
    isRouterAlive: true,
    // 主题列表
    list: setting.theme.list,
    // 默认的主题
    theme: setting.theme.list[0].name,
    // 系统名称
    systemName: setting.system.name,
    // 语言
    language: 'zh'
  },
  getters: {
    /**
     * @description 返回当前的主题信息 不是一个名字 而是当前激活主题的所有数据
     * @param {Object} state vuex state
     */
    activeSetting(state) {
      return state.list.find(theme => theme.name === state.theme)
    }
  },
  actions: {
    /**
     * 刷新重新加载路由
     * @param {Object} state vuex state
     * @param {String} name 路由名字
     */
    routeRefresh({ state, commit }, name) {
      // store 赋值
      state.isRouterAlive = false
      commit('admin/page/keepAliveRemove', name, { root: true })
      setTimeout(() => {
        state.isRouterAlive = true
        commit('admin/page/keepAlivePush', name, { root: true })
      }, 100)
    },
    /**
     * 设置侧边栏展开或者收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse is collapse
     */
    asideCollapseSet({ state, dispatch }, collapse) {
      return new Promise(async resolve => {
        // store 赋值
        state.sidebar = collapse
        // 持久化
        await dispatch('admin/db/set', {
          dbName: 'evaluation',
          path: 'menu.sidebar',
          value: state.sidebar,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.sidebar = !state.sidebar
        // 持久化
        await dispatch('admin/db/set', {
          dbName: 'travel',
          path: 'menu.sidebar',
          value: state.sidebar,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * 从持久化数据读取侧边栏展开或者收缩
     * @param {Object} state vuex state
     */
    asideCollapseLoad({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.sidebar = await dispatch('admin/db/get', {
          dbName: 'travel',
          path: 'menu.sidebar',
          defaultValue: setting.menu.sidebar,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 激活一个主题
     * @param {Object} state vuex state
     * @param {String} themeValue 需要激活的主题名称
     */
    themeSet({ state, commit, dispatch }, themeName) {
      return new Promise(async resolve => {
        // 检查这个主题在主题列表里是否存在
        state.theme = state.list.find(e => e.name === themeName) ? themeName : state.list[0].name
        // 将 vuex 中的主题应用到 dom
        commit('dom')
        // 持久化
        await dispatch('admin/db/set', {
          dbName: 'travel',
          path: 'theme.theme',
          value: state.theme,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据加载主题设置
     * @param {Object} state vuex state
     */
    themeLoad({ state, commit, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        const theme = await dispatch('admin/db/get', {
          dbName: 'travel',
          path: 'theme.theme',
          defaultValue: state.list[0].name,
          user: true
        }, { root: true })
        // 检查这个主题在主题列表里是否存在
        const list = state.list.find(e => e.name === theme)
        if (list) {
          state.theme = theme
          // await dispatch('admin/color/load', null, { root: true })
          await dispatch('admin/color/set', list.color, { root: true })
        } else {
          state.theme = state.list[0].name
          await dispatch('admin/color/set', state.list[0].color, { root: true })
          // 持久化
          await dispatch('admin/db/set', {
            dbName: 'travel',
            path: 'theme.theme',
            value: state.theme,
            user: true
          }, { root: true })
        }
        // 将 vuex 中的主题应用到 dom
        commit('dom')
        // end
        resolve()
      })
    },
    /**
     * @description 设置开启状态
     * @param {Object} state vuex state
     * @param {Boolean} active 新的状态
     */
    activeSet({ state, dispatch }, active) {
      return new Promise(async resolve => {
        // store 赋值
        state.active = active
        // 持久化
        await dispatch('admin/db/set', {
          dbName: 'travel',
          path: 'transition.active',
          value: state.active,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * 从数据库读取页面过渡动画设置
     * @param {Object} state vuex state
     */
    activeLoad({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.active = await dispatch('admin/db/get', {
          dbName: 'travel',
          path: 'transition.active',
          defaultValue: setting.transition.active,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 将 vuex 中的主题应用到 dom
     * @param {Object} state vuex state
     */
    dom(state) {
      document.body.className = `theme-${state.theme}`
    }
  }
}
