import { mapState, mapActions } from 'vuex'
import menuMixin from '../mixin/menu'
import { elMenuItem, elSubmenu } from './util.menu'
import BScroll from 'better-scroll'

export default {
  name: 'MenuSide',
  mixins: [
    menuMixin
  ],
  render(createElement) {
    return createElement('div', { attrs: { class: 'admin-layout-header-aside-menu-side' }}, [
      createElement('el-menu', {
        props: { collapse: this.sidebar, uniqueOpened: true, defaultActive: this.active },
        ref: 'menu',
        on: { select: this.handleMenuSelect }
      }, this.routers.map(menu => (!menu.hidden && menu.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, menu))),
      []
    ])
  },
  data() {
    return {
      active: '',
      asideHeight: 300,
      BS: null
    }
  },
  computed: {
    ...mapState('admin/page', [
      'routers'
    ]),
    ...mapState('admin/app', [
      'sidebar'
    ])
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse(val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    },
    // 监听路由 控制侧边栏激活状态
    '$route.fullPath': {
      handler(value) {
        this.active = value
      },
      immediate: true
    }
  },
  mounted() {
    this.scrollInit()
  },
  beforeDestroy() {
    this.scrollDestroy()
  },
  methods: {
    ...mapActions('admin/app', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle()
    },
    scrollInit() {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      })
    },
    scrollDestroy() {
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    }
  }
}
