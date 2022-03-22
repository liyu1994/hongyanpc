const getters = {
  // 用户权限
  roles: state => state.admin.user.roles,
  // 路由数据
  permission_routers: state => state.admin.page.routers,
  permission_pool: state => state.admin.page.pool,
  permission_opened: state => state.admin.page.opened
}
export default getters
