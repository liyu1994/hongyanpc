const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    username: 'admin',
    password: '000000',
    name: 'Admin',
    id: 23423423,
    userInfo: {
      id: 1,
      userName: 'admin',
      customId: '256815033323884540',
      customNo: 'admin',
      type: 0
    },
    elements: [
      // { code: 'oauthClientDetailsManager:btn_view', menu: '客户端管理', method: 'GET', name: '查看客户端', type: 'uri', uri: '/auth/oauthClientDetails/{*}' },
      // { code: 'positionManager:btn_add', menu: '部门管理', method: 'POST', name: '新增岗位', type: 'button', uri: '/admin/position' }
    ],
    menus: [
      // { code: 'consignment', type: 'menu', uri: '/bill/consignment', method: 'GET', name: '访问', menu: '托运单' },
      { code: 'setting', type: 'menu', href: '/setting', path: '', icon: 'icon04', title: '设置' },
      { code: 'gridDemo', type: 'menu', href: '/grid/index', path: '', icon: '', title: '动态表格' },
      { code: 'clipboardDemo', type: 'menu', href: '/clipboard/index', path: '', icon: '', title: '复制' }
    ]
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    username: 'editor',
    name: 'Editor'
  }
}

// 按钮假数据
const elements = [
  'maintenance_organization_org_btn_add',
  'maintenance_organization_org_btn_edit',
  'maintenance_organization_org_btn_enable',
  'maintenance_organization_org_btn_disable',
  'maintenance_organization_dep_btn_add',
  'maintenance_organization_dep_btn_edit',
  'maintenance_organization_dep_btn_dele',
  'maintenance_organization_post_btn_add',
  'maintenance_organization_post_btn_edit',
  'maintenance_organization_post_btn_dele',
  'maintenance_organization_staff_btn_add',
  'maintenance_organization_staff_btn_edit',
  'maintenance_organization_staff_btn_dele',
  'maintenance_organization_staff_btn_connect'
]

elements.forEach(c => {
  userMap.admin.elements.push({ code: c })
})

export default [
  {
    path: '/api/admin/jwt/token',
    method: 'post',
    handle({ body }) {
      // const user = userMap.find(e => e.username === body.username && e.password === body.password)
      const admin = userMap['admin']
      const user = admin.username === body.username && admin.password === body.password
      if (user) {
        return {
          status: 200,
          message: '登录成功',
          data: {
            ...admin
          }
        }
      } else {
        return {
          status: 401,
          message: '用户名或密码错误',
          data: {}
        }
      }
    }
  },
  {
    path: '/api/admin/user/info',
    method: 'get',
    handle({ body }) {
      return {
        status: 200,
        message: '登录成功',
        data: {
          ...userMap['admin']
        }
      }
    }
  },
  {
    path: '/api/admin/jwt/generateMobileCode',
    method: 'get',
    handle({ body }) {
      return {
        status: 200,
        message: '登录成功',
        data: {
          ...userMap['admin']
        }
      }
    }
  },
  {
    path: '/api/admin/jwt/forgetPassword',
    method: 'post',
    handle({ body }) {
      return {
        status: 200,
        message: '登录成功',
        data: {
          ...userMap['admin']
        }
      }
    }
  }
]
