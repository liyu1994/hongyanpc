<template>
  <el-submenu
    :index="menu.path || uniqueId"
    popper-append-to-body
  >
    <template slot="title">
      <!--<i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>-->
      <svg-icon
        v-if="menu.meta && menu.meta.icon"
        class="icon"
        :icon-class="menu.meta.icon"
      />
      <!-- <i v-else class="fa fa-folder-o" /> -->
      <span
        slot="title"
        :title="getLocale('menu_'+menu.meta.langCode)"
      >
        <!-- {{ menu.meta.title }} -->
        {{ getLocale('menu_'+menu.meta.langCode) }}
      </span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <template v-if="!child.hidden">
        <layout-header-aside-menu-item
          v-if="child.children === undefined"
          :key="childIndex"
          :menu="child"
        />
        <layout-header-aside-menu-sub
          v-else
          :key="childIndex"
          :menu="child"
        />
      </template>
    </template>
  </el-submenu>
</template>

<script>
import { uniqueId } from 'lodash'
// 组件
import LayoutMainMenuItem from '../menu-item'
import { getLocale } from '@/locales'

export default {
  name: 'LayoutHeaderAsideMenuSub',
  components: {
    'layout-header-aside-menu-item': LayoutMainMenuItem
  },
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      uniqueId: uniqueId('admin-menu-empty-')
    }
  },
  methods: {
    getLocale
  }
}
</script>
