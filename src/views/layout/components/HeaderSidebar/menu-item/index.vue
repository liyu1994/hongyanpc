<template>
  <el-menu-item :index="menu.path || uniqueId">
    <!--<i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>-->
    <svg-icon
      v-if="menu.meta && menu.meta.icon"
      class="icon"
      :icon-class="menu.meta.icon"
    />
    <!-- <i v-else class="fa fa-file-o" /> -->
    <span
      slot="title"
      :title="menu.meta.title"
    >
      <!-- {{ menu.meta.title || '未命名菜单' }} -->
      {{ menu.meta.title || '未命名菜单' }}
    </span>
  </el-menu-item>
</template>

<script>
import { uniqueId } from 'lodash'
import { getLocale } from '@/locales'
export default {
  name: 'LayoutHeaderAsideMenuItem',
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
