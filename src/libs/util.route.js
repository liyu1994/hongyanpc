import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { cloneDeep } from 'lodash'
import { constantRouterMap } from '@/router/routes'

const route = {}

/**
 * @description 获取所有路由列表
 */
/* function getAllRoutes() {
  const routes = cloneDeep(store.getters.permission_routers)
  const pool = []
  const push = function(routes) {
    routes.forEach(route => {
      if (route.children) {
        push(route.children)
      } else {
        if (!route.hidden) {
          pool.push({ ...route })
          // const { meta, name, path, component } = route
          // pool.push({ meta, name, path, component })
        }
      }
    })
  }
  push(routes)
  return pool
} */

/**
 * @description 筛选对应路由
 */
function getModules(opts) {
  /* const list = getAllRoutes().filter(item => {
    if (opts && item.name === opts.name) return true
  })
  return list && list[0] */
  // return getAllRoutes().find(t => (t.name === opts.name))
  return store.getters.permission_pool.find(t => (t.name === opts.name))
}

/**
 * @description 获取路由和组件
 */
route.getRoutes = function(opts, guid, news = false) {
  return new Promise(async resolve => {
    const { children = {}} = constantRouterMap.find(v => v.name === 'default')
    const name = opts.name + guid
    if (children.findIndex(item => item.name === name) === -1) {
      // 复制组件
      const routerList = cloneDeep(getModules(opts))
      if (!routerList) {
        Message({
          message: '路由名错误，请重新设置！',
          type: 'error',
          duration: 2 * 1000
        })
        return false
      }
      routerList.name = name
      routerList.meta.news = news
      const result = await routerList.component()
      const render = cloneDeep(result.default)
      render.name = name
      delete render._Ctor
      routerList.component = render
      children.push(routerList)
      router.addRoutes(constantRouterMap)
    }
    router.push({ name: name, query: opts.query })
    // end
    resolve()
  })
}

/**
 * @description 添加路由
* @param {Object} setting opts 配制
 */
route.setRoutes = function(opts) {
  // 路由缓存信息
  const guid = opts.query ? JSON.stringify(opts.query).match(/[a-zA-Z0-9]/g).join('') : global.zh.route
  const views = store.getters.permission_opened
  var visitedViewsItem = views.find(t => (t.name === opts.name || t.name === opts.name + global.zh.route)) || { 'fullPath': 'no' }
  if (((visitedViewsItem.fullPath).match(/[a-zA-Z0-9]/g).join('')).indexOf(guid) === -1) {
    /* route.getRoutes(opts, guid, true, function(res) {
      res && router.addRoutes(res)
      router.push({ name: opts.name + guid, query: opts.query })
    }) */
    route.getRoutes(opts, guid, true)
  } else {
    router.push({ name: opts.name, query: opts.query })
  }
}

export default route
