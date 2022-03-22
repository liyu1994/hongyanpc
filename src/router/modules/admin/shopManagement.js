import Layout from '@/views/layout'

const meta = { name: 'ShopManagement' }

export default {
  path: '/shopManagement',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'ShopManagement',
  meta: {
    title: '商品管理',
    langCode: 'ShopManagement',
    icon: 'ic_member_management'
  },
  children: (pre => [
    {
      path: '/shopManagement', component: () => import('@/views/admin/shopManagement'), name: `${pre}Index`, meta: { ...meta, icon: 'ic_member_management', title: '商品管理', langCode: 'ShopManagement' }
    },
    /*
     * 这里存放不显示的菜单
     */
    {
      path: '/shopManagement/hidden', hidden: true, redirect: 'noredirect', name: `${pre}hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: []
    }
  ])('ShopManagement')
}
