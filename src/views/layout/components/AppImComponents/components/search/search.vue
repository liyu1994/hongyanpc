<!-- 搜索框 -->
<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <el-input v-model="search" type="text" class="searchInput" placeholder="搜索" @keyup.native="inputSearch">
        <i v-if="noSearch" slot="suffix" class="el-icon-search input-icon" @click="searchUser" />
        <i v-else slot="suffix" class="el-icon-circle-close input-icon" @click="deleteSearch" />
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '', // 输入框内容
      noSearch: true // 是否显示搜索图标
    }
  },
  methods: {
    // 输入搜索内容判断,若为空则显示全部好友
    inputSearch() {
      this.noSearch = true
      if (this.search === '') {
        this.change()
      }
    },
    // 搜索用户
    searchUser() {
      if (!this.search) return
      this.change()
    },
    // 改变好友列表
    change() {
      this.$store.dispatch('admin/im/searchRoles', this.search)
      this.noSearch = false
    },
    // 删除搜索内容
    deleteSearch() {
      this.search = ''
      this.change()
      this.noSearch = true
    }
  }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
.wrapper
	padding: 19px 12px 12px 12px
	.search-wrapper
		position: relative
		display: flex
		box-sizing: border-box
		width: 100%
		.searchInput
			flex: 1
			font-size: 12px
			outline: none
			padding: 6px
			background-color: #e8e8e8
			>>> .input-icon
				font-size: 15px;
				position: relative;
				top: 15px;
				left: -10px;
			>>> .el-input__inner
				width: 220px
				height: 32px
				border: 1px solid #d9d7d6
				border-radius: 4px
				background-color: #e5e3e2
				&:focus
					background-color: #ffffff
</style>
