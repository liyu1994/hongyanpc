import Layout from '@/views/layout'

import $orderList from './modules/admin/orderList'
import $shopManagement from './modules/admin/shopManagement'
import $memberManagement from './modules/admin/memberManagement'
import $bannerManagement from './modules/admin/bannerManagement'

export const constantRouterMap = [
  // 登录
  { path: '/login', component: () => import('@/views/login'), name: 'Login', hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: { name: 'home' },
    hidden: true,
    name: 'default',
    children: [
      { path: '/home', component: () => import('@/views/home'), name: 'home', meta: { title: '首页', langCode: 'Home', noCache: true, affix: true }},
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            // next(instance => instance.$router.replace(from.fullPath))
            next(instance => instance.$router.replace({ name: from.name, params: from.params, query: from.query }))
          },
          render: h => h('admin-container')
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next(instance => instance.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h('admin-container')
        }
      }
    ]
  },
  $orderList,
  $shopManagement,
  $memberManagement,
  $bannerManagement
]

/**
 * 在主框架内显示
 */
export const asyncRouterMap = [
  /*
   * 404
   */
  { path: '*', name: '404', component: () => import('@/views/errorPage/404'), hidden: true }
]

export const frameInRoutes = [
  ...constantRouterMap,
  ...asyncRouterMap
]
