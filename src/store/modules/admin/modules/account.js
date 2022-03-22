import util from '@/libs/util.js'
import { resetRouter } from '@/router'
// import { logout } from '@/api/demo/login'
import { loginUser, getUserInfo } from '@/api/login'
import { getLocale } from '@/locales'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     * @param {Object} param code {String} 验证码
     * @param {Object} param route {Object} 登录成功后定向的路由对象
     */
    login({ dispatch }, {
      vm,
      username,
      password,
      // code,
      route = {
        name: 'Home'
      }
    } = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        loginUser({
          username,
          password
          // code: code.toUpperCase()
        })
          .then(async res => {
            // 设置 cookie 一定要存 uuid 和 token 两个 cookie
            // 整个系统依赖这两个数据进行校验和存储
            // token 代表用户当前登录状态 建议在网络请求中携带 token
            // 如有必要 token 需要定时更新，默认保存一天
            util.setToken(res.data)
            // util.cookies.set('token', res.token)
            // 更新路由 尝试去获取 cookie 里保存的需要重定向的页面完整地址
            // const path = util.cookies.get('redirect')
            // 根据是否存有重定向页面判断如何重定向
            // vm.$router.replace(path ? { path } : route)
            // 删除 cookie 中保存的重定向页面
            // util.cookies.remove('redirect')
            // ------------
            // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
            // util.cookies.set('uuid', 'admin-' + (res.data.id || 'uuid'))
            util.cookies.set('uuid', 'admin-' + (res.data.userId || 'admin-uuid'))
            if (res.status === 5006) {
              reject('psw')
            } else {
              resolve()
            }
          })
          .catch(err => {
            reject(err)
            console.log('err: ', err)
          })
      })
    },
    /**
     * @description 获取用户信息
     */
    GetUserInfo({ dispatch }) {
      return new Promise((resolve, reject) => {
        getUserInfo({
          platform: 1
        }).then(async response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
          util.cookies.set('uuid', 'admin-' + (data.userId || 'uuid'))
          // 菜单权限
          const menus = {}
          const menusData = data.menuIds
          if (menusData) {
            for (let i = 0; i < menusData.length; i++) {
              if (menusData[i]) menus[menusData[i]] = true
            }
          }
          // 按钮权限
          const elements = {}
          const elementsData = data.buttonIds
          if (elementsData) {
            for (let i = 0; i < elementsData.length; i++) {
              if (elementsData[i]) elements[elementsData[i]] = true
            }
          }
          // 设置 vuex 用户信息
          await dispatch('admin/user/set', {
            name: data.name,
            mobile: data.mobile,
            photoUrl: data.photoUrl,
            menus,
            elements,
            roles: ['admin']
          }, { root: true })
          // 用户登录后从持久化数据加载一系列的设置
          await dispatch('load')
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * @description 前端注销
     */
    FedLogOut({ dispatch }) {
      return new Promise(async resolve => {
        util.cookies.remove('uuid')
        util.removeToken()
        // 环信注销
        await dispatch('admin/im/imClose', {}, { root: true })
        resolve()
      })
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    LogOut({ commit, dispatch }, { vm, confirm = false } = {}) {
      /**
       * @description 注销
       */
      async function UserLogOut() {
        await dispatch('admin/user/set', {}, { root: true })
          .then(async() => {
            if (process.env.VUE_APP_EMPLOYEES !== 'true') {
              util.removeToken()
              util.cookies.remove('uuid')
            }
            // 关闭全部页面
            await dispatch('admin/page/closeAll', {}, { root: true })
            // 清空所有的路由
            await commit('admin/page/routerClean', {}, { root: true })
            // 清空所有的缓存
            await commit('admin/page/keepAliveClean', {}, { root: true })
            // 初始化路由
            resetRouter()
          })
        // 环信注销
        await dispatch('admin/im/imClose', {}, { root: true })
        // 跳转路由
        if (process.env.VUE_APP_EMPLOYEES === 'true') {
          window.location.href = 'about:blank'
          window.close()
        } else {
          vm.$router.push({
            name: 'Login'
          })
        }
        // 注销刷新页面，清除路由缓存
        /* setTimeout(() => {
          location.reload()
        }, 100) */
        /* logout().then(() => {
          // 删除cookie
          // util.cookies.remove('token')
          util.removeToken()
          util.cookies.remove('uuid')
          await dispatch('admin/user/set', {}, { root: true })
          // 跳转路由
          vm.$router.push({
            name: 'login'
          })
        }) */
      }
      // 判断是否需要确认
      if (confirm) {
        commit('admin/gray/set', true, { root: true })
        vm.$confirm(getLocale('page_login_logout_tips'), getLocale('page_login_logout_tipsTit'), {
          confirmButtonText: getLocale('page_login_logout_tips_confirmButtonText'),
          cancelButtonText: getLocale('page_login_logout_tips_cancelButtonText'),
          type: 'warning',
          center: true
        })
          .then(() => {
            commit('admin/gray/set', false, { root: true })
            UserLogOut()
          })
          .catch(() => {
            commit('admin/gray/set', false, { root: true })
            // vm.$message('放弃注销用户')
          })
      } else {
        UserLogOut()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load({ commit, dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('admin/user/load', null, { root: true })
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('admin/page/openedLoad', null, { root: true })
        // DB -> store 加载主题
        await dispatch('admin/app/themeLoad', null, { root: true })
        // DB -> store 加载语言
        await dispatch('admin/lang/load', null, { root: true })
        // DB -> store 加载组织id
        // await dispatch('admin/org/load', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('admin/app/asideCollapseLoad', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        await dispatch('admin/app/activeLoad', null, { root: true })
        // DB -> store 加载聊天记录
        // await dispatch('admin/im/load', null, { root: true })
        // DB -> store 持久化数据加载颜色设置
        // await dispatch('admin/color/load', null, { root: true })
        // end
        resolve()
      })
    }
  }
}
