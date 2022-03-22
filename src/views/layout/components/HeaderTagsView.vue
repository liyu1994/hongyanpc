<template>
  <div
    class="admin-theme-container-main-header"
    flex="cross:bottom"
  >
    <div
      class="view-page-control-group"
      flex
    >
      <div
        class="view-page-control-content"
        flex-box="1"
      >
        <div class="view-page-control-content-inner">
          <admin-contextmenu
            :visible.sync="contextmenuFlag"
            :x="contentmenuX"
            :y="contentmenuY"
          >
            <admin-contextmenu-list
              :menulist="tagName === 'home' ? contextmenuListIndex : contextmenuList"
              @rowClick="contextmenuClick"
            />
          </admin-contextmenu>
          <el-tabs
            ref="dragTabs"
            class="view-page-control"
            :value="current"
            type="card"
            :closable="false"
            @tab-click="handleClick"
            @edit="handleTabsEdit"
            @contextmenu.native="handleContextmenu"
          >
            <el-tab-pane
              v-for="(page, index) in opened"
              :key="page.fullPath"
              :name="page.name"
            >
              <span slot="label">
                <i
                  class="el-icon-refresh"
                  @click.prevent.stop="refreshSelectedTag(page)"
                />
                <!-- {{ page.meta.title }} -->
                {{ getLocale('menu_'+page.meta.langCode) }}
                <i
                  v-if="!page.meta.affix"
                  class="el-icon-close"
                  @click.prevent.stop="closeSelectedTag(page, index)"
                />
              </span>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div
        class="view-page-control-btn"
        flex-box="0"
      >
        <!--<el-dropdown
          size="default"
          split-button
          @click="handleControlBtnClick"
          @command="command => handleControlItemClick(command)">
          <admin-icon name="times-circle"/>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="left">
              <admin-icon name="arrow-left" class="admin-mr-10"/>
              关闭左侧
            </el-dropdown-item>
            <el-dropdown-item command="right">
              <admin-icon name="arrow-right" class="admin-mr-10"/>
              关闭右侧
            </el-dropdown-item>
            <el-dropdown-item command="other">
              <admin-icon name="times" class="admin-mr-10"/>
              关闭其它
            </el-dropdown-item>
            <el-dropdown-item command="all">
              <admin-icon name="times-circle" class="admin-mr-10"/>
              全部关闭
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
// import { cloneDeep } from 'lodash'
import Sortable from 'sortablejs'
import { getLocale } from '@/locales'

export default {
  components: {
    AdminContextmenu: () => import('./contextmenu'),
    AdminContextmenuList: () => import('./contextmenu/components/contentmenuList')
  },
  data() {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuListIndex: [{ icon: 'times-circle', title: '关闭全部', value: 'all' }],
      contextmenuList: [
        { icon: 'arrow-left', title: '关闭左侧', value: 'left' },
        { icon: 'arrow-right', title: '关闭右侧', value: 'right' },
        { icon: 'times', title: '关闭其它', value: 'other' },
        { icon: 'times-circle', title: '关闭全部', value: 'all' }
      ],
      tagName: 'home'
    }
  },
  computed: {
    ...mapState('admin/page', ['opened', 'current'])
    /* ...mapState('admin/page', {
      opened: state => cloneDeep(state.opened),
      current: state => state.current
    }) */
  },
  mounted() {
    this.$nextTick(() => {
      // this.setSort()
    })
  },
  methods: {
    getLocale,
    ...mapMutations('admin/page', ['keepAliveRemove', 'keepAlivePush', 'keepAliveClean', 'openedUpdate']),
    ...mapActions('admin/page', ['close', 'closeLeft', 'closeRight', 'closeOther', 'closeAll', 'drag']),
    ...mapActions('admin/app', ['routeRefresh']),
    /**
     * @description 右键菜单功能点击
     */
    handleContextmenu(event) {
      let target = event.target
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    },
    /**
     * @description 右键菜单的row-click事件
     */
    contextmenuClick(command) {
      this.handleControlItemClick(command, this.tagName)
    },
    /**
     * @description 接收点击关闭控制上选项的事件
     */
    handleControlItemClick(command, tagName = null) {
      if (tagName) {
        this.contextmenuFlag = false
      }
      const params = {
        pageSelect: tagName,
        vm: this
      }
      switch (command) {
        case 'left':
          this.closeLeft(params)
          break
        case 'right':
          this.closeRight(params)
          break
        case 'other':
          this.closeOther(params)
          break
        case 'all':
          this.closeAll()
          break
        default:
          this.$message.error('无效的操作')
          break
      }
    },
    /**
     * @description 接收点击关闭控制上按钮的事件
     */
    handleControlBtnClick() {
      this.closeAll()
    },
    /**
     * @description 接收点击 tab 标签的事件
     */
    handleClick(tab, event) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find(page => page.name === tab.name)
      const { name, params, query } = page
      if (page) {
        this.$router.push({ name, params, query })
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 home
     */
    handleTabsEdit(tagName, action) {
      if (action === 'remove') {
        this.close({
          tagName
        })
      }
    },
    /**
     * @description 点击删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 home
     */
    closeSelectedTag(view, index) {
      this.close({
        tagName: view.name
      })
    },
    /**
     * @description 点击刷新按钮触发这里 刷新当前路由
     */
    refreshSelectedTag(view) {
      this.routeRefresh(view.name)
      // this.keepAliveRemove(this.$route.name)
      // this.$nextTick(this.$router.replace('/refresh'))
    },
    /**
     * @description 返回顶部
     */
    backToTop() {
      document.getElementById('main-container').scrollTop = 0
    },
    /**
     * @description el-tabs拖动
     */
    setSort() {
      const el = this.$refs.dragTabs.$el.querySelector('.el-tabs__nav')
      // el.querySelector('.el-tabs__item').classList.add('el-tabs__first')
      this.sortable = Sortable.create(el, {
        // filter: '.el-tabs__first',
        // scroll: false,
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetIndex = this.opened.splice(evt.oldIndex, 1)[0]
          this.opened.splice(evt.newIndex, 0, targetIndex)
          this.openedUpdate(this.opened)
          // this.drag(this.opened)
          // const { newIndex, oldIndex } = evt
        }
      })
    }
  }
}
</script>
