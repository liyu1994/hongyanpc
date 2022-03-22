<template>
  <div>
    <el-tooltip
      effect="dark"
      :content="getLocale('layout_topBar_theme')"
      placement="bottom"
    >
      <el-button
        class="admin-ml-0 admin-mr btn-text can-hover"
        type="text"
        @click="dialogVisible = true"
      >
        <svg-icon icon-class="theme" />
        <!--<admin-icon
          name="diamond"
          style="font-size: 16px"/>-->
      </el-button>
    </el-tooltip>
    <el-dialog
      :title="getLocale('layout_topBar_theme')"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true"
    >
      <admin-theme-list style="margin-top: -25px;" />
    </el-dialog>
  </div>
</template>

<script>
import themeList from './components/theme-list'
import { getLocale } from '@/locales'
export default {
  components: {
    'admin-theme-list': themeList
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    getLocale
  }
}
</script>
