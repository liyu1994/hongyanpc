export default {
  namespaced: true,
  state: {
    // 用户角色
    roles: [],
    // 用户信息
    info: {}
  },
  getters: {
    /**
     * 返回所有资源权限
     * @param {Object} state vuex state
     */
    elements(state) {
      return state.info.elements
    },
    menus(state) {
      return state.info.menus
    }
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set({ state, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值
        const { roles, ...other } = info
        state.roles = roles || []
        // delete info.roles
        state.info = other
        // 持久化
        await dispatch('admin/db/set', {
          dbName: 'travel',
          path: 'user.info',
          value: info,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = await dispatch('admin/db/get', {
          dbName: 'travel',
          path: 'user.info',
          defaultValue: {},
          user: true
        }, { root: true })
        // end
        resolve()
      })
    }
  }
}
