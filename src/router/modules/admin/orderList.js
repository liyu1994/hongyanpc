import Layout from '@/views/layout'

const meta = { name: 'OrderList' }

export default {
  path: '/orderList',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'OrderList',
  meta: {
    title: '订单列表',
    langCode: 'OrderList',
    icon: 'ic_order'
  },
  children: (pre => [
    {
      path: '/orderList', component: () => import('@/views/admin/orderList'), name: `${pre}Index`, meta: { ...meta, icon: 'ic_order', title: '订单列表', langCode: 'OrderList' }
    },
    /*
     * 这里存放不显示的菜单
     */
    {
      path: '/orderList/hidden', hidden: true, redirect: 'noredirect', name: `${pre}hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: []
    }
  ])('OrderList')
}
