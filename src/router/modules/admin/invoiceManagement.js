import Layout from '@/views/layout'

const meta = { name: 'InvoiceManagement' }

export default {
  path: '/invoiceManagement',
  component: Layout,
  redirect: 'noredirect',
  alwaysShow: false,
  name: 'InvoiceManagement',
  meta: {
    title: '发票管理',
    langCode: 'OrderList',
    icon: 'ic_order'
  },
  children: (pre => [
    {
      path: '/invoiceManagement', component: () => import('@/views/admin/invoiceManagement'), name: `${pre}Index`, meta: { ...meta, icon: 'ic_order', title: '发票管理' }
    },
    /*
     * 这里存放不显示的菜单
     */
    {
      path: '/orderList/hidden', hidden: true, redirect: 'noredirect', name: `${pre}hidden`, meta: { ...meta, title: '隐藏菜单' },
      children: []
    }
  ])('InvoiceManagement')
}
