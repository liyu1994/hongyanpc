import Vue from 'vue'
import Router from 'vue-router'

// 路由数据
import { constantRouterMap } from './routes'

import store from '@/store/index'

import util from '@/libs/util.js'

import { Message } from 'element-ui'

import { head, last } from 'lodash'

// 进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

// fix vue-router NavigationDuplicated
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch(err => err)
}

const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(Router)

// 导出路由 在 main.js 里使用
const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// router.$addRoutes = (params) => {
//   router.matcher = new Router({ mode: 'history' }).matcher
//   router.addRoutes(params)
// }

// NProgress.configure({ showSpinner: false })// NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (roles.includes('admin')) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login']// no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('admin/search/set', false)
  // determine if there has token
  if (util.getToken()) {
    // has token
    if (to.path === '/login') {
      next({ path: '/' })
      // if current page is home will not trigger  afterEach hook, so manually handle it
      NProgress.done()
    } else {
      // 判断当前用户是否已拉取完user_info信息
      if (store.getters.roles.length === 0) {
        try {
          // get user info
          const { menuIds } = await store.dispatch('admin/account/GetUserInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('admin/page/generateRoutes', menuIds || [])

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
          // next()
        } catch (error) {
          // await store.dispatch('admin/account/FedLogOut')
          await store.dispatch('admin/account/LogOut', { vm: router.app, confirm: false })
          Message.error('验证失败，请再次登录')
          // next({ path: '/login' })
          NProgress.done()
        }
        /* store.dispatch('admin/account/GetUserInfo').then(res => { // 拉取user_info
          // const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          const menus = res.data.menus || [] // 菜单权限
          store.dispatch('admin/page/generateRoutes', { menus }).then(routes => { // 根据roles权限生成可访问的路由表
            // router.options.routes = store.state.admin.page.routers
            // router.addRoutes(router.options.routes)
            router.addRoutes(routes) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(() => {
          store.dispatch('admin/account/FedLogOut').then(() => {
            Message.error('验证失败，请再次登录')
            next({ path: '/login' })
            NProgress.done()
          })
        }) */
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          // next()
          if (to.matched.length > 2 && !to.meta.showIframe) {
            // const guid = Object.keys(to.query).length ? JSON.stringify(to.query).match(/[a-zA-Z0-9]/g).join('') : global.zh.route
            // const guid = global.zh.route
            /* util.route.getRoutes(to, guid, false, (res) => {
              res && router.addRoutes(res)
              router.push({ name: to.name + guid, query: to.query })
            }) */
            // util.route.getRoutes(to, guid, false)
            // 多级路由处理
            // to.matched.splice(1, 1)
            const firstChildren = head(to.matched)
            const lastChildren = last(to.matched)
            lastChildren.parent = firstChildren
            to.matched.length = 1
            to.matched.push(lastChildren)
          }
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      // 将当前预计打开的页面完整地址临时存储 登录后继续跳转
      // 这个 cookie(redirect) 会在登录后自动删除
      // util.cookies.set('redirect', to.fullPath)
      // 没有登录的时候跳转到登录界面
      if (process.env.VUE_APP_EMPLOYEES === 'true') {
        window.location.href = 'about:blank'
        window.close()
      } else {
        next({
          name: 'Login',
          query: {
            redirect: to.fullPath
          }
        })
      }
      // next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('admin/page/open', to)
    .then(res => {
      // 同路由，参数不同，刷新路由
      res && store.dispatch('admin/app/routeRefresh', to.name, { root: true })
    })
  // 需要的信息
  /* const app = router.app
  const { name, params, query, fullPath, meta } = to
  // 多页控制 打开新的页面
  app.$store.dispatch('admin/page/open', { name, params, query, fullPath, meta })
    .then(res => {
      if (res) {
        // 同路由，参数不同，刷新路由
        app.$store.dispatch('admin/app/routeRefresh', name, { root: true })
      }
    })
  */
  // 更改标题
  util.title(to.meta.title)
})

// 初始化路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
