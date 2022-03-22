// 设置文件
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 语言列表
    list: setting.lang.list,
    // 默认语言
    active: setting.lang.active
  },
  getters: {
    /**
     * 返回当前语言所有数据
     * @param {Object} state vuex state
     */
    activeSetting(state) {
      return state.list.find(theme => theme.label === state.active)
    }
  },
  actions: {
    /**
     * @description 设置语言
     * @param {Object} state vuex state
     * @param {String} language 语言
     */
    set({ state, commit, dispatch }, language) {
      return new Promise(async resolve => {
        // store 赋值
        // 检查语言在列表里是否存在
        state.active = state.list.find(e => e.label === language) ? language : state.list[0].label
        // 持久化
        await dispatch('admin/db/set', {
          dbName: 'travel',
          path: 'lang.active',
          value: state.active,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据读取语言
     * @param {Object} state vuex state
     */
    load({ state, commit, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        const active = await dispatch('admin/db/get', {
          dbName: 'travel',
          path: 'lang.active',
          defaultValue: state.active,
          user: true
        }, { root: true })
        // 检查这个主题在主题列表里是否存在
        if (state.list.find(e => e.label === active)) {
          state.active = active
        } else {
          state.active = state.list[0].label
          // 持久化
          await dispatch('admin/db/set', {
            dbName: 'travel',
            path: 'lang.active',
            value: state.active,
            user: true
          }, { root: true })
        }
        // end
        resolve()
      })
    }
  }
}
