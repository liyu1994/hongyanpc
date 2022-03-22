import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: '我是测试数据',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: '@first'
  }))
}

export default [
  {
    path: '/api/test/tree',
    method: 'get',
    handle() {
      return { 'status': 200, 'message': null, 'data': [{ 'id': 'MENU18041400003003A000', 'parentId': '-1', 'children': [{ 'id': 'MENU18050400013002A000', 'parentId': 'MENU18041400003003A000', 'children': [{ 'id': 'MENU18050400013002A030', 'parentId': 'MENU18050400013002A000', 'title': '创建运单' }], 'icon': null, 'title': '创建运单', 'href': '/bill/add', 'spread': true, 'path': '/bill/addConsignment', 'component': null, 'authority': null, 'redirect': null, 'code': 'addConsignment', 'label': null }, { 'id': 'MENU18052300017004A000', 'parentId': 'MENU18041400003003A000', 'children': [], 'icon': null, 'title': '货源', 'href': '/bill/goods', 'spread': true, 'path': '/bill/goods', 'component': null, 'authority': null, 'redirect': null, 'code': 'goods', 'label': null }, { 'id': 'MENU18052300017005A000', 'parentId': 'MENU18041400003003A000', 'children': [], 'icon': null, 'title': '库存管理', 'href': '/bill/stock', 'spread': true, 'path': '/bill/stock', 'component': null, 'authority': null, 'redirect': null, 'code': 'stock', 'label': null }, { 'id': 'MENU18041400003007A000', 'parentId': 'MENU18041400003003A000', 'children': [], 'icon': null, 'title': '托运单', 'href': '/bill/consignment', 'spread': true, 'path': '/bill/consignment', 'component': null, 'authority': null, 'redirect': null, 'code': 'consignment', 'label': null }, { 'id': 'MENU18041400003012A000', 'parentId': 'MENU18041400003003A000', 'children': [], 'icon': null, 'title': '提货单', 'href': '/bill/pick', 'spread': true, 'path': '/bill/pick', 'component': null, 'authority': null, 'redirect': null, 'code': 'pick', 'label': null }, { 'id': 'MENU18052300017006A000', 'parentId': 'MENU18041400003003A000', 'children': [], 'icon': null, 'title': '配载单', 'href': '/bill/stowage', 'spread': true, 'path': '/bill/stowage', 'component': null, 'authority': null, 'redirect': null, 'code': 'stowage', 'label': null }, { 'id': 'MENU18041400003008A000', 'parentId': 'MENU18041400003003A000', 'children': [], 'icon': null, 'title': '分拨单', 'href': '/bill/distribution', 'spread': true, 'path': '/bill/distribution', 'component': null, 'authority': null, 'redirect': null, 'code': 'distribution', 'label': null }, { 'id': 'MENU18041400003009A000', 'parentId': 'MENU18041400003003A000', 'children': [], 'icon': null, 'title': '外包单', 'href': '/bill/outsource', 'spread': true, 'path': '/bill/outsource', 'component': null, 'authority': null, 'redirect': null, 'code': 'outsource', 'label': null }, { 'id': 'MENU18041400003010A000', 'parentId': 'MENU18041400003003A000', 'children': [], 'icon': null, 'title': '配送单', 'href': '/bill/delivery', 'spread': true, 'path': '/bill/delivery', 'component': null, 'authority': null, 'redirect': null, 'code': 'delivery', 'label': null }, { 'id': 'MENU18041400003011A000', 'parentId': 'MENU18041400003003A000', 'children': [], 'icon': null, 'title': '签收单', 'href': '/bill/sign', 'spread': true, 'path': '/bill/sign', 'component': null, 'authority': null, 'redirect': null, 'code': 'sign', 'label': null }], 'icon': 'sidebar_icon01', 'title': '业务', 'href': '/bill', 'spread': true, 'path': '/bill', 'component': null, 'authority': null, 'redirect': null, 'code': 'bill', 'label': null }, { 'id': 'MENU18041400003002A000', 'parentId': '-1', 'children': [{ 'id': 'MENU18072600021003A000', 'parentId': 'MENU18041400003002A000', 'children': [], 'icon': null, 'title': '财务首页', 'href': '/finance/index', 'spread': true, 'path': '/finance/index', 'component': null, 'authority': null, 'redirect': null, 'code': 'index', 'label': null }, { 'id': 'MENU18071800021002A000', 'parentId': 'MENU18041400003002A000', 'children': [], 'icon': null, 'title': '应收应付', 'href': '/finance/ARAP', 'spread': true, 'path': '/finance/ARAP', 'component': null, 'authority': null, 'redirect': null, 'code': 'ARAP', 'label': null }, { 'id': 'MENU18072600021004A000', 'parentId': 'MENU18041400003002A000', 'children': [], 'icon': null, 'title': '核销记录', 'href': 'finance/record', 'spread': true, 'path': '/finance/record', 'component': null, 'authority': null, 'redirect': null, 'code': 'record', 'label': null }, { 'id': 'MENU18041400003005A000', 'parentId': 'MENU18041400003002A000', 'children': [], 'icon': null, 'title': '收款单', 'href': '/finance/receipt', 'spread': true, 'path': '/finance/receipt', 'component': null, 'authority': null, 'redirect': null, 'code': 'receipt', 'label': null }, { 'id': 'MENU18041400003006A000', 'parentId': 'MENU18041400003002A000', 'children': [], 'icon': null, 'title': '付款单', 'href': '/finance/payment', 'spread': true, 'path': '/finance/payment', 'component': null, 'authority': null, 'redirect': null, 'code': 'payment', 'label': null }], 'icon': 'sidebar_icon02', 'title': '财务', 'href': '/finance', 'spread': true, 'path': '/finance', 'component': null, 'authority': null, 'redirect': null, 'code': 'finance', 'label': null }, { 'id': 'MENU18050700015002A000', 'parentId': '-1', 'children': [{ 'id': 'MENU18050700015003A000', 'parentId': 'MENU18050700015002A000', 'children': [], 'icon': null, 'title': '报表', 'href': '/report/index', 'spread': true, 'path': '/stat/report', 'component': null, 'authority': null, 'redirect': null, 'code': 'report', 'label': null }], 'icon': 'sidebar_icon03', 'title': '统计', 'href': '/stat', 'spread': true, 'path': '/stat', 'component': null, 'authority': null, 'redirect': null, 'code': 'stat', 'label': null }, { 'id': '5', 'parentId': '-1', 'children': [{ 'id': 'MENU18033000002002A000', 'parentId': '5', 'children': [], 'icon': '', 'title': '组织机构', 'href': '/setting/organization', 'spread': true, 'path': '/setting/organization', 'component': null, 'authority': null, 'redirect': null, 'code': 'organization', 'label': null }, { 'id': '7', 'parentId': '5', 'children': [], 'icon': 'sidebar_icon04', 'title': '角色管理', 'href': '/setting/role', 'spread': true, 'path': '/setting/role', 'component': null, 'authority': null, 'redirect': null, 'code': 'role', 'label': null }, { 'id': '1', 'parentId': '5', 'children': [], 'icon': '', 'title': '职员管理', 'href': 'setting/staff', 'spread': true, 'path': '/setting/staff', 'component': null, 'authority': null, 'redirect': null, 'code': 'staff', 'label': null }, { 'id': 'MENU18052300017003A000', 'parentId': '5', 'children': [], 'icon': null, 'title': '客户管理', 'href': '/setting/customer', 'spread': true, 'path': '/setting/customer', 'component': null, 'authority': null, 'redirect': null, 'code': 'customer', 'label': null }, { 'id': '21', 'parentId': '5', 'children': [], 'icon': '', 'title': '线路运价', 'href': '/setting/lines', 'spread': true, 'path': '/setting/lines', 'component': null, 'authority': null, 'redirect': null, 'code': 'lines', 'label': null }, { 'id': '27', 'parentId': '5', 'children': [], 'icon': '', 'title': '车辆管理', 'href': '/setting/car', 'spread': true, 'path': '/setting/car', 'component': null, 'authority': null, 'redirect': null, 'code': 'car', 'label': null }, { 'id': '8', 'parentId': '5', 'children': [], 'icon': '', 'title': '司机管理', 'href': '/setting/driver', 'spread': true, 'path': '/setting/driver', 'component': null, 'authority': null, 'redirect': null, 'code': 'driver', 'label': null }, { 'id': 'MENU18052300017002A000', 'parentId': '5', 'children': [], 'icon': null, 'title': '打印模板', 'href': '/sortable/index', 'spread': true, 'path': '/setting/sortable', 'component': null, 'authority': null, 'redirect': null, 'code': 'sortable', 'label': null }], 'icon': 'sidebar_icon04', 'title': '设置', 'href': '/setting', 'spread': true, 'path': '/setting', 'component': null, 'authority': null, 'redirect': null, 'code': 'setting', 'label': null }], 'rel': true }
    }
  },
  {
    path: '/api/test/btnList',
    method: 'get',
    handle() {
      return { 'status': 200, 'message': null, 'data': { 'total': 6, 'rows': [{ 'jwtInfo': null, 'id': 'BUTT18053000020032A000', 'gmtCreate': '2018-05-30 17:20:02', 'gmtModified': null, 'no': 1, 'code': 'delivery_add', 'type': 'button', 'name': '新增', 'uri': '111', 'menuId': 'MENU18041400003010A000', 'parentId': null, 'path': null, 'method': 'GET', 'description': null, 'createUserId': 'USER18042600067024A000', 'modifiedUserId': null, 'deleted': 0 }, { 'jwtInfo': null, 'id': 'BUTT18053000020033A000', 'gmtCreate': '2018-05-30 17:20:20', 'gmtModified': null, 'no': 2, 'code': 'delivery_edit', 'type': 'button', 'name': '编辑', 'uri': '111', 'menuId': 'MENU18041400003010A000', 'parentId': null, 'path': null, 'method': 'GET', 'description': null, 'createUserId': 'USER18042600067024A000', 'modifiedUserId': null, 'deleted': 0 }, { 'jwtInfo': null, 'id': 'BUTT18053000020034A000', 'gmtCreate': '2018-05-30 17:20:38', 'gmtModified': null, 'no': 3, 'code': 'delivery_cancel', 'type': 'button', 'name': '取消', 'uri': '111', 'menuId': 'MENU18041400003010A000', 'parentId': null, 'path': null, 'method': 'GET', 'description': null, 'createUserId': 'USER18042600067024A000', 'modifiedUserId': null, 'deleted': 0 }, { 'jwtInfo': null, 'id': 'BUTT18053000020035A000', 'gmtCreate': '2018-05-30 17:20:53', 'gmtModified': null, 'no': 4, 'code': 'delivery_detail', 'type': 'button', 'name': '详情', 'uri': '111', 'menuId': 'MENU18041400003010A000', 'parentId': null, 'path': null, 'method': 'GET', 'description': null, 'createUserId': 'USER18042600067024A000', 'modifiedUserId': null, 'deleted': 0 }, { 'jwtInfo': null, 'id': 'BUTT18053000020036A000', 'gmtCreate': '2018-05-30 17:21:11', 'gmtModified': null, 'no': 5, 'code': 'delivery_send', 'type': 'button', 'name': '配送', 'uri': '111', 'menuId': 'MENU18041400003010A000', 'parentId': null, 'path': null, 'method': 'GET', 'description': null, 'createUserId': 'USER18042600067024A000', 'modifiedUserId': null, 'deleted': 0 }, { 'jwtInfo': null, 'id': 'BUTT18053000020037A000', 'gmtCreate': '2018-05-30 17:22:38', 'gmtModified': null, 'no': 6, 'code': 'delivery_export', 'type': 'button', 'name': '导出', 'uri': '111', 'menuId': 'MENU18041400003010A000', 'parentId': null, 'path': null, 'method': 'GET', 'description': null, 'createUserId': 'USER18042600067024A000', 'modifiedUserId': null, 'deleted': 0 }] }}
    }
  },
  {
    path: '/api/test/isBtn',
    method: 'get',
    handle() {
      return { 'status': 200, 'message': null, 'data': ['BUTT18053000018002A000', 'BUTT18053000018003A000', 'BUTT18053000020002A000', 'BUTT18053000020004A000', 'BUTT18053000020005A000', 'BUTT18053000020006A000', 'BUTT18053000020007A000', 'BUTT18053000020008A000', 'BUTT18053000020009A000', 'BUTT18053000020010A000', 'BUTT18053000020011A000', 'BUTT18053000020012A000', 'BUTT18053000020013A000', 'BUTT18053000020014A000', 'v11111111111117', 'BUTT18053000020003A000', 'BUTT18053000020022A000', 'BUTT18053000020023A000', 'BUTT18053000020024A000', 'BUTT18053000020025A000', 'BUTT18053000020026A000', 'BUTT18053000020038A000', 'BUTT18053000020039A000', 'BUTT18053000020040A000', 'BUTT18053000020041A000', 'BUTT18053000020032A000', 'BUTT18053000020036A000', 'BUTT18053000020037A000', 'BUTT18053000020027A000', 'BUTT18053000020028A000', 'BUTT18053000020029A000', 'BUTT18053000020030A000', 'BUTT18053000020031A000', 'BUTT18053000020017A000'], 'rel': true }
    }
  },
  {
    path: '/api/operator/getOption',
    method: 'get',
    handle() {
      const data = {
        GoodsAttribute: [
          { code: 'DEAD_WEIGHT', desc: '重货' },
          { code: 'LIGHT_WEIGHT', desc: '抛货' }
        ],
        GoodsType: [
          { code: '1', desc: '家电家居' },
          { code: '2', desc: '五金配件' },
          { code: '3', desc: '工业原料' }
        ],
        PackageMethods: [
          { code: '1', desc: '纸箱' },
          { code: '2', desc: '铁桶' },
          { code: '3', desc: '纤袋' }
        ],
        DeliveryMethod: [
          { code: 'DTD_DELIVERY', desc: '上门提货' },
          { code: 'HOME_DELIVERY', desc: '自送上门' }
        ],
        GoodsUnits: [
          { code: 'PIECE', desc: '件' },
          { code: 'KG', desc: '公斤' },
          { code: 'MMM', desc: '立方' }
        ],
        ConsignBaseStatus: [
          { code: 'AL_BILLED', desc: '已开单' },
          { code: 'AL_GOT_GOODS', desc: '已提货' },
          { code: 'AL_STORAGED', desc: '已入库' }
        ],
        ReceiptRequire: [
          { code: 'NO_RECEIPT', desc: '无需回单' },
          { code: 'RECEIPT_SIGN', desc: '回单签字' },
          { code: 'RETURN_CHECK', desc: '返回签收' },
          { code: 'RECEIPT_CHECK', desc: '回单签收' }
        ],
        ConsignSource: [
          { code: 'BACKSTAGE_ADD', desc: '后台添加' },
          { code: 'CUSTOMER_ORDER', desc: '客户下单' }
        ],
        PayType: [
          { code: 'CASH', desc: '现付' },
          { code: 'COLLECT', desc: '到付' },
          { code: 'MONTH', desc: '月结' },
          { code: 'RECEIPT', desc: '回单付' },
          { code: 'ARREARAGE', desc: '欠付' },
          { code: 'MIXTURE', desc: '混合付' },
          { code: 'RESIDUE_COLLECT', desc: '余款到付' },
          { code: 'COLLECT_MONTH', desc: '到付月结' },
          { code: 'LOAN', desc: '贷款付' },
          { code: 'RESIDUE_RECEIPT', desc: '余款回付' }
        ],
        DispatchMethod: [
          { code: 'DTD_DELIVERY', desc: '自提' },
          { code: 'HOME_DELIVERY', desc: '送货' }
        ]
      }
      return { status: 200, message: null, data: data, rel: true }
    }
  },
  {
    path: '/api/article/list',
    method: 'get',
    handle(config) {
      const { importance, type, title, page = 1, limit = 20, sort } = config.params

      const Lists = []
      const count = 100

      const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
      const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

      for (let i = 0; i < count; i++) {
        Lists.push(Mock.mock({
          id: '@increment',
          timestamp: +Mock.Random.date('T'),
          author: '@first',
          reviewer: '@first',
          title: '@title(5, 10)',
          content_short: '我是测试数据',
          content: baseContent,
          forecast: '@float(0, 100, 2, 2)',
          importance: '@integer(1, 3)',
          'model': '@boolean',
          'type|1': ['CN', 'US', 'JP', 'EU'],
          'status|1': ['published', 'draft', 'deleted'],
          display_time: '@datetime',
          comment_disabled: true,
          pageviews: '@integer(300, 5000)',
          image_uri,
          platforms: ['a-platform']
        }))
      }

      let mockList = Lists.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      const thisdata = {
        total: mockList.length,
        list: pageList
      }
      return { status: 200, message: null, data: thisdata, rel: true }
    }
  },
  {
    path: '/api/test/list',
    method: 'get',
    handle(config) {
      const { importance, type, status, title, page = 1, limit = 20, sort } = config.params

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (status && item.status !== status) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      const thisdata = {
        total: mockList.length,
        list: pageList
      }

      return { status: 200, message: null, data: thisdata, rel: true }
    }
  },
  {
    path: '/api/demo/business/table/1/fetch.*',
    method: 'get',
    handle({ params, Repeat }) {
      const { pageSize } = params
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          page: {
            total: 1000
          },
          list: Repeat(pageSize, {
            'key': '@guid',
            'value|1': [10, 100, 200, 500],
            'type': '@boolean',
            'admin': '@cname',
            'adminNote': '@cparagraph(0.5)',
            'dateTimeCreat': '@datetime',
            'used': '@boolean',
            'dateTimeUse': '@datetime'
          })
        }
      }
    }
  }
]
