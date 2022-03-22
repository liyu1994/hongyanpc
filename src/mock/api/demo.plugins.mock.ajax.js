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

const meunData = [{ 'id': 'MENU19012800022000M000', 'parentId': '-1', 'children': [], 'text': '单据管理', 'nodes': [], 'icon': '' }, { 'id': 'MENU19021300026003M000', 'parentId': '-1', 'children': [], 'text': '系统设置', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028013M000', 'parentId': 'MENU19031500028007M000', 'children': [], 'text': '车主对账单生成', 'nodes': [], 'icon': null }, { 'id': 'MENU19021300026002M000', 'parentId': 'MENU19012800022000M000', 'children': [], 'text': '委托单管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028006M000', 'parentId': '-1', 'children': [], 'text': '业务工作台', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028004M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'text': '角色管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028019M000', 'parentId': 'MENU19031500028008M000', 'children': [], 'text': '车辆认证未通过列表', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028017M000', 'parentId': 'MENU19031500028007M000', 'children': [], 'text': '车主对账单支付', 'nodes': [], 'icon': null }, { 'id': 'MENU19021300026004M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'text': '菜单管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028009M000', 'parentId': '-1', 'children': [], 'text': '报表中心', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028010M000', 'parentId': 'MENU19031500028006M000', 'children': [], 'text': '货主小二工作台', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028001M000', 'parentId': 'MENU19012800022000M000', 'children': [], 'text': '工单管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031800032000M000', 'parentId': 'MENU19031500028009M000', 'children': [], 'text': '报表管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028014M000', 'parentId': 'MENU19031500028007M000', 'children': [], 'text': '车主对账单管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028018M000', 'parentId': 'MENU19031500028008M000', 'children': [], 'text': '车辆列表管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028005M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'text': '字段配置', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028011M000', 'parentId': 'MENU19031500028006M000', 'children': [], 'text': '车主小二工作台', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028016M000', 'parentId': 'MENU19031500028007M000', 'children': [], 'text': '货主对账单管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19021300026005M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'text': '员工管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028002M000', 'parentId': 'MENU19012800022000M000', 'children': [], 'text': '异常管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028008M000', 'parentId': '-1', 'children': [], 'text': '车辆管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028015M000', 'parentId': 'MENU19031500028007M000', 'children': [], 'text': '货主对账单生成', 'nodes': [], 'icon': null }, { 'id': 'MENU19021300026009M000', 'parentId': 'MENU19012800022000M000', 'children': [], 'text': '托运单管理', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028012M000', 'parentId': 'MENU19031500028006M000', 'children': [], 'text': '代货主发货', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028007M000', 'parentId': '-1', 'children': [], 'text': '财务工作台', 'nodes': [], 'icon': null }, { 'id': 'MENU19031500028003M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'text': '组织机构', 'nodes': [], 'icon': null }]
const treeData = [{ 'id': 'MENU19012800022000M000', 'parentId': '-1', 'children': [{ 'id': 'MENU19021300026002M000', 'parentId': 'MENU19012800022000M000', 'children': [], 'icon': null, 'title': '委托单管理', 'href': '/bills/limitorder', 'spread': true, 'path': '/001/bills-limitorder', 'component': null, 'authority': null, 'redirect': null, 'code': 'bills-limitorder', 'label': null }, { 'id': 'MENU19021300026009M000', 'parentId': 'MENU19012800022000M000', 'children': [], 'icon': null, 'title': '托运单管理', 'href': '/bills/consignmentbill', 'spread': true, 'path': '/001/null', 'component': null, 'authority': null, 'redirect': null, 'code': 'bills-consignmentbill', 'label': null }, { 'id': 'MENU19031500028001M000', 'parentId': 'MENU19012800022000M000', 'children': [], 'icon': null, 'title': '工单管理', 'href': '/bills/workorder', 'spread': true, 'path': '/001/bills-workorder', 'component': null, 'authority': null, 'redirect': null, 'code': 'bills-workorder', 'label': null }, { 'id': 'MENU19031500028002M000', 'parentId': 'MENU19012800022000M000', 'children': [], 'icon': null, 'title': '异常管理', 'href': '/bills/abnormal', 'spread': true, 'path': '/001/bills-abnormal', 'component': null, 'authority': null, 'redirect': null, 'code': 'bills-abnormal', 'label': null }], 'icon': '', 'title': '单据管理', 'href': '/bills', 'spread': true, 'path': '/001', 'component': null, 'authority': null, 'redirect': null, 'code': 'bills', 'label': null }, { 'id': 'MENU19021300026003M000', 'parentId': '-1', 'children': [{ 'id': 'MENU19021300026004M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'icon': null, 'title': '菜单管理', 'href': '/sys/menu', 'spread': true, 'path': '/system/system-menu', 'component': null, 'authority': null, 'redirect': null, 'code': 'sys-menu', 'label': null }, { 'id': 'MENU19021300026005M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'icon': null, 'title': '员工管理', 'href': '/sys/staff', 'spread': true, 'path': '/system/system-staff', 'component': null, 'authority': null, 'redirect': null, 'code': 'sys-staff', 'label': null }, { 'id': 'MENU19031500028003M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'icon': null, 'title': '组织机构', 'href': '/sys/organize', 'spread': true, 'path': '/system/system-organize', 'component': null, 'authority': null, 'redirect': null, 'code': 'sys-organize', 'label': null }, { 'id': 'MENU19031500028004M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'icon': null, 'title': '角色管理', 'href': '/sys/roles', 'spread': true, 'path': '/system/system-roles', 'component': null, 'authority': null, 'redirect': null, 'code': 'sys-roles', 'label': null }, { 'id': 'MENU19031500028005M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'icon': null, 'title': '字段配置', 'href': '/sys/fieldConfigure', 'spread': true, 'path': '/system/system-fieldConfigure', 'component': null, 'authority': null, 'redirect': null, 'code': 'sys-field-configure', 'label': null }, { 'id': 'MENU19042300000002M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'icon': null, 'title': '配置管理', 'href': '/sys/auditManage', 'spread': true, 'path': '/system/sys-audit-manage', 'component': null, 'authority': null, 'redirect': null, 'code': 'sys-audit-manage', 'label': null }, { 'id': 'MENU19042300000003M000', 'parentId': 'MENU19021300026003M000', 'children': [], 'icon': null, 'title': '结算模板', 'href': '/sys/settleTemplate', 'spread': true, 'path': '/system/sys-settle-template', 'component': null, 'authority': null, 'redirect': null, 'code': 'sys-settle-template', 'label': null }], 'icon': null, 'title': '系统设置', 'href': '/sys', 'spread': true, 'path': '/system', 'component': null, 'authority': null, 'redirect': null, 'code': 'sys', 'label': null }, { 'id': 'MENU19031500028006M000', 'parentId': '-1', 'children': [{ 'id': 'MENU19031500028010M000', 'parentId': 'MENU19031500028006M000', 'children': [], 'icon': null, 'title': '货主小二工作台', 'href': '/serviceBench/cargoOwner/index', 'spread': true, 'path': '/serviceBench/service-bench-cargo-owner', 'component': null, 'authority': null, 'redirect': null, 'code': 'service-bench-cargo-owner', 'label': null }, { 'id': 'MENU19031500028011M000', 'parentId': 'MENU19031500028006M000', 'children': [], 'icon': null, 'title': '车主小二工作台', 'href': '/serviceBench/vehicleOwner/index', 'spread': true, 'path': '/serviceBench/service-bench-vehicle-owner', 'component': null, 'authority': null, 'redirect': null, 'code': 'service-bench-vehicle-owner', 'label': null }, { 'id': 'MENU19031500028012M000', 'parentId': 'MENU19031500028006M000', 'children': [], 'icon': null, 'title': '代货主发货', 'href': '/serviceBench/consignorProxy', 'spread': true, 'path': '/serviceBench/service-bench-consignor-proxy', 'component': null, 'authority': null, 'redirect': null, 'code': 'service-bench-consignor-proxy', 'label': null }], 'icon': null, 'title': '业务工作台', 'href': '/serviceBench', 'spread': true, 'path': '/serviceBench', 'component': null, 'authority': null, 'redirect': null, 'code': 'serviceBench', 'label': null }, { 'id': 'MENU19031500028007M000', 'parentId': '-1', 'children': [{ 'id': 'MENU19031500028013M000', 'parentId': 'MENU19031500028007M000', 'children': [], 'icon': null, 'title': '车主对账单生成', 'href': '/financeBench/vehicleOwner/statementGeneration', 'spread': true, 'path': '/financeBench/finance-bench-vehicle-owner-statement-generation', 'component': null, 'authority': null, 'redirect': null, 'code': 'finance-bench-vehicle-owner-statement-generation', 'label': null }, { 'id': 'MENU19031500028014M000', 'parentId': 'MENU19031500028007M000', 'children': [], 'icon': null, 'title': '车主对账单管理', 'href': '/financeBench/vehicleOwner/statementManage', 'spread': true, 'path': '/financeBench/finance-bench-vehicle-owner-statement-manage', 'component': null, 'authority': null, 'redirect': null, 'code': 'finance-bench-vehicle-owner-statement-manage', 'label': null }, { 'id': 'MENU19031500028015M000', 'parentId': 'MENU19031500028007M000', 'children': [], 'icon': null, 'title': '货主对账单生成', 'href': '/financeBench/cargoOwner/statementGeneration', 'spread': true, 'path': '/financeBench/finance-bench-cargo-owner-statement-generation', 'component': null, 'authority': null, 'redirect': null, 'code': 'finance-bench-cargo-owner-statement-generation', 'label': null }, { 'id': 'MENU19031500028016M000', 'parentId': 'MENU19031500028007M000', 'children': [], 'icon': null, 'title': '货主对账单管理', 'href': '/financeBench/cargoOwner/statementManage', 'spread': true, 'path': '/financeBench/finance-bench-cargo-owner-statement-manage', 'component': null, 'authority': null, 'redirect': null, 'code': 'finance-bench-cargo-owner-statement-manage', 'label': null }, { 'id': 'MENU19031500028017M000', 'parentId': 'MENU19031500028007M000', 'children': [], 'icon': null, 'title': '车主对账单支付', 'href': '/financeBench/vehicleOwner/statementPay', 'spread': true, 'path': '/financeBench/finance-bench-vehicle-owner-statement-pay', 'component': null, 'authority': null, 'redirect': null, 'code': 'finance-bench-vehicle-owner-statement-pay', 'label': null }], 'icon': null, 'title': '财务工作台', 'href': '/financeBench', 'spread': true, 'path': '/financeBench', 'component': null, 'authority': null, 'redirect': null, 'code': 'financeBench', 'label': null }, { 'id': 'MENU19031500028008M000', 'parentId': '-1', 'children': [{ 'id': 'MENU19031500028018M000', 'parentId': 'MENU19031500028008M000', 'children': [], 'icon': null, 'title': '车辆列表管理', 'href': '/vehicles/list', 'spread': true, 'path': '/vehicles/vehicles-list', 'component': null, 'authority': null, 'redirect': null, 'code': 'vehicles-list', 'label': null }, { 'id': 'MENU19031500028019M000', 'parentId': 'MENU19031500028008M000', 'children': [], 'icon': null, 'title': '车辆认证未通过列表', 'href': '/vehicles/noAuthentication', 'spread': true, 'path': '/vehicles/vehicles-noAuthentication', 'component': null, 'authority': null, 'redirect': null, 'code': 'vehicles-noAuthentication', 'label': null }], 'icon': null, 'title': '车辆管理', 'href': '/vehicles', 'spread': true, 'path': '/vehicles', 'component': null, 'authority': null, 'redirect': null, 'code': 'vehicles', 'label': null }, { 'id': 'MENU19031500028009M000', 'parentId': '-1', 'children': [{ 'id': 'MENU19031800032000M000', 'parentId': 'MENU19031500028009M000', 'children': [], 'icon': null, 'title': '报表管理', 'href': '/reportForm/frame', 'spread': true, 'path': '/reportForm/reportForm-frame', 'component': null, 'authority': null, 'redirect': null, 'code': 'reportForm-frame', 'label': null }], 'icon': null, 'title': '报表中心', 'href': '/reportForm', 'spread': true, 'path': '/reportForm', 'component': null, 'authority': null, 'redirect': null, 'code': 'reportForm', 'label': null }]
const buttonData = { 'status': 200, 'message': '操作成功', 'data': { 'total': 3, 'rows': [{ 'jwtInfo': null, 'id': 'BUTT19031900034010B000', 'gmtCreate': '2019-03-19 10:51:27', 'gmtModified': '2019-03-19 10:52:17', 'no': 1, 'code': 'serviceBench-unConfirmed', 'type': 'button', 'name': '待确认委托', 'uri': '/vehicleOwner/index', 'menuId': 'MENU19031500028011M000', 'parentId': null, 'path': null, 'method': 'GET', 'description': '待确认委托tab', 'createUserId': 'USER19011800016001U000', 'modifiedUserId': 'USER19011800016001U000', 'deleted': false }, { 'jwtInfo': null, 'id': 'BUTT19031900034011B000', 'gmtCreate': '2019-03-19 10:51:46', 'gmtModified': '2019-03-19 10:52:13', 'no': 2, 'code': 'serviceBench-unStowage', 'type': 'button', 'name': '待配载', 'uri': '/vehicleOwner/index', 'menuId': 'MENU19031500028011M000', 'parentId': null, 'path': null, 'method': 'GET', 'description': '待配载Tab', 'createUserId': 'USER19011800016001U000', 'modifiedUserId': 'USER19011800016001U000', 'deleted': false }, { 'jwtInfo': null, 'id': 'BUTT19031900034012B000', 'gmtCreate': '2019-03-19 10:52:06', 'gmtModified': '2019-03-19 10:52:06', 'no': 3, 'code': 'serviceBench-stowageCache', 'type': 'button', 'name': '配载暂存', 'uri': '/vehicleOwner/index', 'menuId': 'MENU19031500028011M000', 'parentId': null, 'path': null, 'method': 'GET', 'description': '配载暂存Tab', 'createUserId': 'USER19011800016001U000', 'modifiedUserId': null, 'deleted': false }] }}
const authorityButton = { 'status': 200, 'message': '操作成功', 'data': ['BUTT19031800034000B000', 'BUTT19031800034001B000', 'BUTT19031800034002B000', 'BUTT19031900034003B000', 'BUTT19031900034004B000', 'BUTT19031900034005B000', 'BUTT19031900034006B000', 'BUTT19031900034007B000', 'BUTT19031900034008B000', 'BUTT19031900034009B000', 'BUTT19031900034010B000', 'BUTT19031900034011B000', 'BUTT19031900034012B000'], 'rel': true }
const menuData = { 'status': 200, 'message': '操作成功', 'data': { 'jwtInfo': null, 'id': 'MENU19021300026002M000', 'gmtCreate': '2019-02-13 15:08:13', 'gmtModified': '2019-02-13 15:08:13', 'no': 27, 'code': 'bills-limitorder', 'title': '委托单管理', 'parentId': 'MENU19012800022000M000', 'href': '/bills/limitorder', 'icon': null, 'type': 'menu', 'rank': 0, 'description': null, 'path': '/001/bills-limitorder', 'belong': 1, 'deleted': false, 'createUserId': 'USER19011800016001U000', 'modifiedUserId': null, 'buttonList': null }, 'rel': true }

export default [
  {
    path: '/api/authority/menu',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: meunData, rel: true }
    }
  },
  {
    path: '/api/authority/tree',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: treeData, rel: true }
    }
  },
  {
    path: '/api/authority/modifyMenuAuthority',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: '修改成功', rel: true }
    }
  },
  {
    path: '/api/authority/addMenuAuthority',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: '新增成功', rel: true }
    }
  },
  {
    path: '/api/authority/listByUserId',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: meunData, rel: true }
    }
  },
  {
    path: '/api/authority/resetUserAuthority',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: meunData, rel: true }
    }
  },
  {
    path: '/api/authority/authorityButton',
    method: 'get',
    handle() {
      return authorityButton
    }
  },
  {
    path: '/api/authority/addButton',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: '新增成功', rel: true }
    }
  },
  {
    path: '/api/authority/deleteButton',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: '删除成功', rel: true }
    }
  },
  {
    path: '/api/authority/updateButton',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: '修改成功', rel: true }
    }
  },
  {
    path: '/api/authority/authorityttonAdd',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: meunData, rel: true }
    }
  },
  {
    path: '/api/authority/addButtonAuthority',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: meunData, rel: true }
    }
  },
  {
    path: '/api/authority/addRole',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: meunData, rel: true }
    }
  },
  {
    path: '/api/authority/updateRole',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: meunData, rel: true }
    }
  },
  {
    path: '/api/authority/addMenu',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: '成功', rel: true }
    }
  },
  {
    path: '/api/authority/updateMenu',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: '成功', rel: true }
    }
  },
  {
    path: '/api/authority/deleteMenu',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: '成功', rel: true }
    }
  },
  {
    path: '/api/authority/getMenu',
    method: 'get',
    handle() {
      return menuData
    }
  },
  {
    path: '/api/authority/deleteButton',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: '删除成功', rel: true }
    }
  },
  {
    path: '/api/authority/buttonList',
    method: 'get',
    handle() {
      return buttonData
    }
  },
  {
    path: '/api/message/listMessageMailSend',
    method: 'get',
    handle(config) {
      const { importance, type, status, title, pageNum = 1, pageSize = 20, sort } = config.params

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
      const pageList = mockList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))
      const thisdata = {
        total: mockList.length,
        list: pageList
      }
      return { status: 200, message: null, data: thisdata, rel: true }
    }
  },
  {
    path: '/api/test/add',
    method: 'post',
    handle() {
      return { status: 200, message: null, data: '', rel: true }
    }
  },
  {
    path: '/api/test/edit',
    method: 'put',
    handle() {
      return { status: 200, message: null, data: '', rel: true }
    }
  },
  {
    path: '/api/test/get',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: '', rel: true }
    }
  },
  {
    path: '/api/demo/plugins/mock/ajax',
    method: 'get',
    handle({ Repeat }) {
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          list: Repeat('4-10', {
            'id|+1': 1,
            'name': '@CNAME',
            'star|1-5': '★',
            'delFlag|1': [0, 1],
            'creatDate': '@DATE',
            'address': '@CITY',
            'zip': '@ZIP'
          })
        }
      }
    }
  }
]
