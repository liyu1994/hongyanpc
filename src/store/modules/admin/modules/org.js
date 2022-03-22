import store from '@/store'
export default {
  namespaced: true,
  state: {
    // orgId
    orgId: ''
  },
  getters: {
    /**
     * 返回组织ID
     * @param {Object} state vuex state
     */
    orgId(state) {
      return state.orgId
    }
  },
  actions: {
    set({ state, dispatch, commit }, orgId) {
      return new Promise(async resolve => {
        // 记录上个值
        const old = state.value
        // store 赋值
        state.orgId = orgId
        // state.orgList = orgId.list
        // 持久化
        await dispatch('admin/db/set', {
          dbName: 'travel',
          path: 'org.orgId',
          value: state.orgId,
          user: true
        }, { root: true })
        // 应用
        commit('apply', {
          oldId: old,
          newId: state.orgId
        })
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
        const orgId = await dispatch('admin/db/get', {
          dbName: 'travel',
          path: 'org.orgId',
          defaultValue: state.orgId,
          user: true
        }, { root: true })
        // 检查这个主题在主题列表里是否存在
        const orgList = store.state.admin.user.info.organizationVOList
        if (orgList.find(e => e.orgId === orgId)) {
          state.orgId = orgId
        } else {
          state.orgId = orgList[0].orgId
          // 持久化
          await dispatch('admin/db/set', {
            dbName: 'travel',
            path: 'org.orgId',
            value: state.orgId,
            user: true
          }, { root: true })
        }
        // end
        resolve()
      })
    }
  },
  mutations: {
    apply(state, { oldId, newId }) {
      // console.log(state, oldId, newId)
    }
  }
}
