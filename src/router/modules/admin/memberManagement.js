import Layout from '@/views/layout'

const meta = { name: 'OrderList' }

export default {
  path: '/memberManagement',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'MemberManagement',
  meta: {
    title: '会员管理',
    langCode: 'MemberManagement',
    icon: 'ic_commodity_management'
  },
  children: (pre => [
    {
      path: '/memberManagement', component: () => import('@/views/admin/memberManagement'), name: `${pre}Index`, meta: { ...meta, icon: 'ic_commodity_management', title: '会员管理', langCode: 'MemberManagement' }
    },
    /*
     * 这里存放不显示的菜单
     */
    {
      path: '/memberManagement/hidden', hidden: true, redirect: 'noredirect', name: `${pre}hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: []
    }
  ])('MemberManagement')
}
