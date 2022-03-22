<template>
  <el-table
    class="theme-table"
    :data="list"
    v-bind="table"
  >
    <el-table-column
      prop="title"
      align="center"
      width="160"
    >
      <template slot-scope="scope">
        <div class="text-nowrap" :title="getLocale('layout_topBar_theme_'+scope.row.name)">{{ getLocale('layout_topBar_theme_'+scope.row.name) }}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="主题颜色"
      align="center"
      width="120"
    >
      <div
        slot-scope="scope"
        class="theme-preview"
        :style="{
          backgroundColor: `${scope.row.color}`
        }"
      />
    </el-table-column>
    <!--<el-table-column
      label="预览"
      width="120">
      <div
        slot-scope="scope"
        class="theme-preview"
        :style="{
          backgroundImage: `url(${$baseUrl}${scope.row.preview})`
        }">
      </div>
    </el-table-column>-->
    <el-table-column
      align="center"
    >
      <template slot-scope="scope">
        <el-button
          v-if="theme === scope.row.name"
          type="success"
          icon="el-icon-check"
          round
        >
          {{ getLocale('layout_topBar_theme_btn_active') }}
        </el-button>
        <el-button
          v-else
          round
          @click="handleSelectTheme(scope.row)"
        >
          {{ getLocale('layout_topBar_theme_btn') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getLocale } from '@/locales'
export default {
  name: 'AdminThemeList',
  data() {
    return {
      table: {
        showHeader: false,
        border: true
      }
    }
  },
  computed: {
    ...mapState('admin/app', [
      'list',
      'theme'
    ])
  },
  methods: {
    getLocale,
    ...mapActions('admin/app', [
      'themeSet'
    ]),
    ...mapActions('admin/color', [
      'set'
    ]),
    handleSelectTheme(res) {
      this.themeSet(res.name)
      this.set(res.color)
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '~@/assets/styles/public.scss';
.theme-preview {
  height: 20px;
  width: 50px;
  margin: 0 auto;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
.theme-table {
  /deep/ td {
    padding: 10px 0 !important;
  }
  /deep/ .cell {
    height: auto !important;
    line-height: 34px;
  }
  /deep/ .el-button {
    max-width: 200px;
    overflow: hidden;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
