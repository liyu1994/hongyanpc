import directive from './directives'

export default {
  install(Vue, options) {
    /*
     * 权限
     */
    Vue.directive('permission', directive.permission)
    /*
     * 复制
     */
    Vue.directive('clipboard', directive.clipboard)
    /*
     * el-dialog 鼠标拖动
     */
    Vue.directive('el-drag-dialog', directive.drag)
    /*
     * 水波纹，点击效果
     */
    Vue.directive('waves', directive.waves)
    /**
     * 动态添加路由，同路由多页面打开。修改和详情页面
     * @param v-addRoutes:query="{'billNo': 122}" param
     * @param v-addRoutes="{'name': '路由名称'}"
     */
    Vue.directive('addRoutes', directive.addRoutes)
    /**
     * el-popover，防止点击删除多个
     * @param
     */
    Vue.directive('loadClick', directive.loadClick)
    /**
     *v-transfer-dom 实现组件自动移动到 body 下
     */
    Vue.directive('transfer-dom', directive.transferDom)
  }
}

