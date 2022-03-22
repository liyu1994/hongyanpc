import Layout from '@/views/layout'

const meta = { name: 'OrderList' }

export default {
  path: '/bannerManagement',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'BannerManagement',
  meta: {
    title: '会员管理',
    icon: 'ic_commodity_management'
  },
  children: (pre => [
    {
      path: '/bannerManagement', component: () => import('@/views/admin/bannerManagement'), name: `${pre}Index`, meta: { ...meta, icon: 'icon04', title: '轮播图管理' }
    },
    /*
     * 这里存放不显示的菜单
     */
    {
      path: '/bannerManagement/hidden', hidden: true, redirect: 'noredirect', name: `${pre}hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: []
    }
  ])('BnnerManagement')
}
