export default {
  data() {
    return {
      loading: false,
      // ag-grid 列表值
      gridList: [],
      // ag-grid 选中的值
      selectRowData: [],
      // 分页公用数据
      total: 0,
      page: {
        page: 1,
        limit: 20
      }
    }
  },
  methods: {
    // 导出
    onBthExport() {
      this.$refs.testGrid.onBthExport()
    },
    // 行选择或取消选择
    onRowSelected(row) {
      this.selectRowData = row
    },
    // 重置搜索条件
    handleFormReset() {
      this.$refs.form.resetFields()
    },
    // 分页
    handlePaginationChange(val) {
      this.page = val
      // nextTick 只是为了优化示例中 notify 的显示
      this.$nextTick(() => {
        this.getList()
      })
    },
    // 查询
    handleFilter() {
      this.page.page = 1
      this.getList()
    }
  }
}
