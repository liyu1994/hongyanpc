import { remove, get, cloneDeep } from 'lodash'
import { asyncRouterMap, constantRouterMap } from '@/router/routes'

// 设置文件
import setting from '@/setting.js'
import router from '@/router'

// 判定是否需要缓存
const isKeepAlive = data => !get(data, 'meta.noCache', false)

export default {
  namespaced: true,
  state: {
    // 所有有权限的本地路由
    routers: constantRouterMap,
    // 有权限的路由
    // permission: [],
    // 可以在多页 tab 模式下显示的页面
    pool: [],
    // 当前显示的多页面列表
    opened: setting.page.opened,
    // 当前页面
    current: '',
    // 需要缓存的页面 name
    keepAlive: []
  },
  actions: {
    /**
     * @class opened
     * @description 从持久化数据载入分页列表
     * @param {Object} state vuex state
     */
    openedLoad({ state, commit, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        const value = await dispatch('admin/db/get', {
          dbName: 'travel',
          path: 'page.opened',
          defaultValue: setting.page.opened,
          user: true
        }, { root: true })
        // 在处理函数中进行数据优化 过滤掉现在已经失效的页签或者已经改变了信息的页签
        // 以 name 字段为准
        // 如果页面过多的话可能需要优化算法
        // valid 有效列表 1, 1, 0, 1 => 有效, 有效, 失效, 有效
        const valid = []
        // 处理数据
        state.opened = value.map(opened => {
          // 忽略首页
          if (opened.name === 'home') {
            valid.push(1)
            return opened
          }
          // 尝试在所有的支持多标签页的页面里找到 name 匹配的页面
          const find = state.pool.find(item => item.name === opened.name)
          // 记录有效或无效信息
          valid.push(find ? 1 : 0)
          // 返回合并后的数据 新的覆盖旧的
          // 新的数据中一般不会携带 params 和 query, 所以旧的参数会留存
          return Object.assign({}, opened, find)
        }).filter((opened, index) => valid[index] === 1)
        // 根据 opened 数据生成缓存设置
        commit('keepAliveRefresh')
        // end
        resolve()
      })
    },
    /**
     * 将 opened 属性赋值并持久化 在这之前请先确保已经更新了 state.opened
     * @param {Object} state vuex state
     */
    openadmindb({ state, dispatch }) {
      return new Promise(async resolve => {
        // 设置数据
        dispatch('admin/db/set', {
          dbName: 'travel',
          path: 'page.opened',
          value: state.opened,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @class opened
     * @description 更新页面列表上的某一项
     * @param {Object} state vuex state
     * @param {Object} param { index, params, query } 路由信息
     */
    openedUpdate({ state, commit, dispatch }, { index, params, query, fullPath }) {
      return new Promise(async resolve => {
        // 更新页面列表某一项
        const page = state.opened[index]
        page.params = params || page.params
        page.query = query || page.query
        page.fullPath = fullPath || page.fullPath
        state.opened.splice(index, 1, page)
        // 增加缓存设置
        if (isKeepAlive(page)) {
          commit('keepAlivePush', page.name)
        }
        // 持久化
        await dispatch('openadmindb')
        // end
        resolve()
      })
    },
    /**
     * @class opened
     * @description 新增一个 tag (打开一个页面)
     * @param {Object} state vuex state
     * @param {Object} param new tag info
     */
    add({ state, commit, dispatch }, { tag, params, query, fullPath }) {
      return new Promise(async resolve => {
        // 设置新的 tag 在新打开一个以前没打开过的页面时使用
        const newTag = tag
        newTag.params = params || newTag.params
        newTag.query = query || newTag.query
        newTag.fullPath = fullPath || newTag.fullPath
        // 添加进当前显示的页面数组
        state.opened.push(newTag)
        // 如果这个页面需要缓存 将其添加到缓存设置
        if (isKeepAlive(newTag)) {
          commit('keepAlivePush', tag.name)
        }
        // 持久化
        await dispatch('openadmindb')
        // end
        resolve()
      })
    },
    /**
     * @class current
     * @description 打开一个新的页面
     * @param {Object} state vuex state
     * @param {Object} param { name, params, query, fullPath, meta } 路由信息
     */
    open({ state, commit, dispatch }, { name, params, query, fullPath, meta = {}}) {
      return new Promise(async resolve => {
        // 已经打开的页面
        const opened = state.opened
        // 判断是否同路由，参数不同
        let pageRefresh = false
        // 判断此页面是否已经打开 并且记录位置
        let pageOpendIndex = 0
        const pageOpend = opened.find((page, index) => {
          const same = page.name === name
          pageOpendIndex = same ? index : pageOpendIndex
          return same
        })
        if (pageOpend) {
          if ((pageOpend.fullPath !== fullPath) && fullPath) {
            pageRefresh = true
          }
          // 页面以前打开过 但是新的页面可能 name 一样，参数不一样
          await dispatch('openedUpdate', {
            index: pageOpendIndex,
            params,
            query,
            fullPath
          })
        } else {
          // 页面以前没有打开过
          // let page = state.pool.find(t => t.name === name)
          const guid = Object.keys(query).length && meta.news ? JSON.stringify(query).match(/[a-zA-Z0-9]/g).join('') : global.zh.route
          const page = cloneDeep(state.pool.find(t => (t.name === name || t.name + guid === name)))
          // 如果这里没有找到 page 代表这个路由虽然在框架内 但是不参与标签页显示
          if (page) {
            if (page.name + guid === name) {
              page.name = page.name + guid
            }
            await dispatch('add', {
              tag: Object.assign({}, page),
              params,
              query,
              fullPath
            })
          }
        }
        commit('currentSet', name)
        // end
        resolve(pageRefresh)
      })
    },
    /**
     * @class opened
     * @description 关闭一个 tag (关闭一个页面)
     * @param {Object} state vuex state
     * @param {Object} param { tagName: 要关闭的标签名字, to: 是否指定跳转路由 , fnc: 跳转路由执行方法 }
     */
    close({ state, commit, dispatch }, { tagName, to = null, fnc }) {
      return new Promise(async resolve => {
        const find = to && state.pool.find(item => item.name === to.name)
        if (to && !find) {
          router.app.$message.error('to 跳转路由配制错误')
          return false
        }
        // 下个新的页面
        let newPage = state.opened[0]
        const isCurrent = state.current === tagName
        // 如果关闭的页面就是当前显示的页面
        if (isCurrent) {
          // 去找一个新的页面
          const len = state.opened.length
          for (let i = 1; i < len; i++) {
            if (state.opened[i].name === tagName) {
              if (i < len - 1) {
                newPage = state.opened[i + 1]
              } else {
                newPage = state.opened[i - 1]
              }
              break
            }
          }
        }
        // 找到这个页面在已经打开的数据里是第几个
        const index = state.opened.findIndex(page => page.name === tagName)
        if (index >= 0) {
          // 如果这个页面是缓存的页面 将其在缓存设置中删除
          commit('keepAliveRemove', tagName)
          // commit('keepAliveRemove', state.opened[index].name)
          // 更新数据 删除关闭的页面
          state.opened.splice(index, 1)
        }
        // 持久化
        await dispatch('openadmindb')
        const page = to || newPage
        const includes = state.keepAlive.findIndex(res => (res === page.name || res === page.name + global.zh.route))
        // 最后需要判断是否需要跳到首页
        if (isCurrent) {
          const { name = '', params = {}, query = {}} = page
          const routerObj = {
            name,
            params,
            query
          }
          // vm.$router.push(routerObj)
          router.push(routerObj)
        }
        // 跳转路由后执行方法
        if (fnc && includes !== -1) {
          setTimeout(() => {
            const modules = router.app.$children[0].$refs['root'].$refs['routerview'] || {}
            if (typeof modules[fnc] === 'function') {
              modules[fnc]()
            }
          }, 200)
        }
        // end
        resolve(includes)
      })
    },
    /**
     * @class opened
     * @description 关闭当前标签左边的标签
     * @param {Object} state vuex state
     * @param {Object} param { pageSelect: 当前选中的tagName }
     */
    closeLeft({ state, commit, dispatch }, { pageSelect } = {}) {
      return new Promise(async resolve => {
        const pageAim = pageSelect || state.current
        let currentIndex = 0
        state.opened.forEach((page, index) => {
          if (page.name === pageAim) {
            currentIndex = index
          }
        })
        if (currentIndex > 0) {
          // 删除打开的页面 并在缓存设置中删除
          state.opened.splice(1, currentIndex - 1).forEach(({ name }) => commit('keepAliveRemove', name))
        }
        state.current = pageAim
        /* if (vm && vm.$route.name !== pageAim) {
          vm.$router.push({
            name: pageAim
          })
        } */
        if (router.app.$route.name !== pageAim) {
          router.push({
            name: pageAim
          })
        }
        // 持久化
        await dispatch('openadmindb')
        // end
        resolve()
      })
    },
    /**
     * @class opened
     * @description 关闭当前标签右边的标签
     * @param {Object} state vuex state
     * @param {Object} param { pageSelect: 当前选中的tagName }
     */
    closeRight({ state, commit, dispatch }, { pageSelect } = {}) {
      return new Promise(async resolve => {
        const pageAim = pageSelect || state.current
        let currentIndex = 0
        state.opened.forEach((page, index) => {
          if (page.name === pageAim) {
            currentIndex = index
          }
        })
        // 删除打开的页面 并在缓存设置中删除
        state.opened.splice(currentIndex + 1).forEach(({ name }) => commit('keepAliveRemove', name))
        // 设置当前的页面
        state.current = pageAim
        /* if (vm && vm.$route.name !== pageAim) {
          vm.$router.push({
            name: pageAim
          })
        } */
        if (router.app.$route.name !== pageAim) {
          router.push({
            name: pageAim
          })
        }
        // 持久化
        await dispatch('openadmindb')
        // end
        resolve()
      })
    },
    /**
     * @class opened
     * @description 关闭当前激活之外的 tag
     * @param {Object} state vuex state
     * @param {Object} param { pageSelect: 当前选中的tagName }
     */
    closeOther({ state, commit, dispatch }, { pageSelect } = {}) {
      return new Promise(async resolve => {
        const pageAim = pageSelect || state.current
        let currentIndex = 0
        state.opened.forEach((page, index) => {
          if (page.name === pageAim) {
            currentIndex = index
          }
        })
        // 删除打开的页面数据 并更新缓存设置
        if (currentIndex === 0) {
          state.opened.splice(1).forEach(({ name }) => commit('keepAliveRemove', name))
        } else {
          state.opened.splice(currentIndex + 1).forEach(({ name }) => commit('keepAliveRemove', name))
          state.opened.splice(1, currentIndex - 1).forEach(({ name }) => commit('keepAliveRemove', name))
        }
        // 设置新的页面
        state.current = pageAim
        /* if (vm && vm.$route.name !== pageAim) {
          vm.$router.push({
            name: pageAim
          })
        } */
        if (router.app.$route.name !== pageAim) {
          router.push({
            name: pageAim
          })
        }
        // 持久化
        await dispatch('openadmindb')
        // end
        resolve()
      })
    },
    /**
     * @class opened
     * @description 关闭所有 tag
     * @param {Object} state vuex state
     */
    closeAll({ state, commit, dispatch }) {
      return new Promise(async resolve => {
        // 删除打开的页面 并在缓存设置中删除
        state.opened.splice(1).forEach(({ name }) => commit('keepAliveRemove', name))
        // 持久化
        await dispatch('openadmindb')
        // 关闭所有的标签页后需要判断一次现在是不是在首页
        /* if (vm.$route.name !== 'Index') {
          vm.$router.push({
            name: 'Index'
          })
        } */
        if (router.app.$route.name !== 'home') {
          router.push({
            name: 'home'
          })
        }
        // end
        resolve()
      })
    },
    /**
     * 初始化menu权限
     * @param {Object} state vuex state
     * @param {Object} data menu权限
     */
    generateRoutes({ state, commit, dispatch }, data) {
      /**
       * 通过authority判断是否与当前用户权限匹配
       * @param menus
       * @param route
       */
      function hasPermission(menus, route) {
        if (route.name) {
          if (menus[route.name] !== undefined) {
            return menus[route.name]
          } else {
            return false
          }
        } else {
          return true
        }
      }
      /**
       * 递归过滤异步路由表，返回符合用户角色权限的路由表
       * @param asyncRouterMap
       * @param roles
       */
      function filterAsyncRouter(asyncRouterMap, menus, menuDatas) {
        const res = []
        asyncRouterMap.forEach(route => {
          const tmp = { ...route }
          // 如果是隐藏菜单 则不需要进行权限判断 直接加入到可访问路由表中
          if (tmp.hidden) {
            res.push(tmp)
          }
          if (hasPermission(menus, tmp)) {
            // if (tmp.meta && menuDatas[tmp.name].resourceName) tmp.meta.title = menuDatas[tmp.name].resourceName
            // 图标
            // if (route.meta && menuDatas[route.name].icon) route.meta.icon = menuDatas[route.name].icon
            if (tmp.children && tmp.children.length) {
              tmp.children = filterAsyncRouter(tmp.children, menus, menuDatas)
            }
            res.push(tmp)
          }
        })
        return res
        /* const accessedRouters = asyncRouterMap.filter(route => {
          // 如果是隐藏菜单 则不需要进行权限判断 直接加入到可访问路由表中
          if (route.hidden) {
            return true
          }
          if (hasPermission(menus, route)) {
            if (route.meta && menuDatas[route.name].resourceName) route.meta.title = menuDatas[route.name].resourceName
            // 图标 不配置了
            // if (route.meta && menuDatas[route.name].icon) route.meta.icon = menuDatas[route.name].icon
            if (route.children && route.children.length) {
              route.children = filterAsyncRouter(route.children, menus, menuDatas)
            }
            return true
          }
          return false
        })
        return accessedRouters */
      }
      return new Promise(async resolve => {
        const menuDatas = {}
        const menus = {}
        const menusList = [...data]
        for (let i = 0; i < menusList.length; i++) {
          if (menusList[i]) menus[menusList[i]] = true
          if (menusList[i]) menuDatas[menusList[i]] = menusList[i]
        }
        // 权限第一期放开
        let asyncRouter = asyncRouterMap
        // 放开权限设置
        // 生产环境才执行
        // if (process.env.NODE_ENV === 'production') {
        if (process.env.VUE_APP_PERMISSION === 'true') {
          asyncRouter = filterAsyncRouter(asyncRouterMap, menus, menuDatas)
        }
        await commit('routersSet', asyncRouter)
        await commit('admin/search/init', asyncRouter, { root: true })
        // end
        resolve(asyncRouter)
      })
    },
    /**
     * 排序
     * @param {Object} state vuex state
     * @param {Object} data list
     */
    drag({ state, commit, dispatch }, list) {
      return new Promise(async resolve => {
        const opened = [...list]
        state.opened = Array.from(new Set(opened))
        // 持久化
        // await dispatch('openadmindb')
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @class pool, permission, routers
     * @description 保存 pool (候选池), 动态添加的路由， 所以有权限的路由
     * @param {Object} state vuex state
     */
    routersSet(state, routers) {
      // 处理路由 得到每一级的路由设置
      const pool = []
      const push = function(routes) {
        routes.forEach(route => {
          if (route.children) {
            push(route.children)
          } else {
            if (!route.hidden) {
              pool.push({ ...route })
              // const { meta, name, path } = route
              // pool.push({ meta, name, path })
            }
          }
        })
      }
      push(constantRouterMap.concat(routers))
      state.pool = pool
      // state.permission = routers
      state.routers = constantRouterMap.concat(routers)
    },
    /**
     * @description 清空路由
     * @param {Object} state vuex state
     */
    routerClean(state) {
      state.pool = []
      state.routers = constantRouterMap
    },
    /**
     * @class keepAlive
     * @description 从已经打开的页面记录中更新需要缓存的页面记录
     * @param {Object} state vuex state
     */
    keepAliveRefresh(state) {
      state.keepAlive = state.opened.filter(item => isKeepAlive(item)).map(e => e.name)
    },
    /**
     * @description 删除一个页面的缓存设置
     * @param {Object} state vuex state
     * @param {String} name name
     */
    keepAliveRemove(state, name) {
      const list = [...state.keepAlive]
      remove(list, item => item === name)
      state.keepAlive = list
      /* const index = list.findIndex(item => item === name)
      if (index !== -1) {
        list.splice(index, 1)
        state.keepAlive = list
      } */
      // const list = [...state.keepAlive]
      // const index = list.findIndex(item => item === name)
      // list.splice(index, 1)
      // state.keepAlive = list
    },
    /**
     * @description 增加一个页面的缓存设置
     * @param {Object} state vuex state
     * @param {String} name name
     */
    keepAlivePush(state, name) {
      const keep = [...state.keepAlive]
      keep.push(name)
      // state.keepAlive = keep
      state.keepAlive = Array.from(new Set(keep))
    },
    /**
     * @description 清空页面缓存设置
     * @param {Object} state vuex state
     */
    keepAliveClean(state) {
      state.keepAlive = []
    },
    openedUpdate(state, list) {
      const opened = [...list]
      state.opened = Array.from(new Set(opened))
      // state.opened = []
    },
    /**
     * @class current
     * @description 设置当前激活的页面 name
     * @param {Object} state vuex state
     * @param {String} name new name
     */
    currentSet(state, name) {
      state.current = name
    },
    /**
     * @class pool
     * @description 保存 pool (候选池)
     * @param {Object} state vuex state
     * @param {Array} routes routes
     */
    init(state, routes) {
      const pool = []
      const push = function(routes) {
        routes.forEach(route => {
          if (route.children) {
            push(route.children)
          } else {
            if (!route.hidden) {
              const { meta, name, path } = route
              pool.push({ meta, name, path })
            }
          }
        })
      }
      push(routes)
      state.pool = pool
    }
  }
}
