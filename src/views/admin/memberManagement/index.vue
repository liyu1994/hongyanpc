<template>
  <admin-container class="grid-table">
    <div
      class="grid-body"
      flex="dir:top"
    >
      <div class="menu-name">会员管理</div>
      <div class="admin-p admin-bg-white" style="margin: 20px" flex="dir:top" flex-box="1">
        <div
          flex-box="0"
          class="form-search"
        >
          <el-form
            ref="form"
            :inline="true"
            :model="listQuery"
            size="mini"
          >
            <!--  会员名称 -->
            <el-form-item label="会员名称：" prop="userName">
              <el-input
                v-model.trim="listQuery.userName"
                class="roleName"
                placeholder="请输入会员名称"
                clearable
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
            <!--  手机号码 -->
            <el-form-item label="手机号码：" prop="userMobile">
              <el-input
                v-model.trim="listQuery.userMobile"
                class="roleName"
                placeholder="请输入手机号码"
                clearable
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="loading"
                @click="handleFilter"
              >
                <admin-icon name="search" />查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleFormReset">
                <admin-icon name="refresh" />重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div
          flex-box="1"
          style="margin-top: 15px"
          class="grid-list"
        >
          <el-table
            :data="gridList"
            stripe
            height="100%"
            style="width: 100%"
          >
            <el-table-column
              prop="userName"
              label="姓名"
            />
            <el-table-column
              prop="userCode"
              label="会员号"
            />
            <el-table-column
              prop="userMobile"
              label="手机号"
            />
            <el-table-column
              prop="userIdNo"
              label="身份证号"
              align="left"
            />
            <div slot="empty">
              <p>
                <img src="~@/assets/imgs/default_data@2x.png">
              </p>
              <p><span>暂无相关数据~</span></p>
            </div>
          </el-table>
        </div>
        <admin-pagination
          flex-box="0"
          class="footer-page"
          :page="page.page"
          :limit="page.limit"
          :total="total"
          @change="handlePaginationChange"
        />
      </div>
    </div>
  </admin-container>
</template>

<script>
import { cloneDeep } from 'lodash'
import pagination from '@/mixins/pagination'
import { listPage } from '@/api/admin'

export default {
  name: 'MemberManagement',
  components: { },
  mixins: [pagination],
  data() {
    return {
      listQuery: {
        userName: '',
        userMobile: ''
      },
      loading: false
    }
  },

  mounted() {
    this.handleFilter()
  },
  methods: {
    //  获取接口列表
    getList() {
      const listQuery = this.getListQuery()
      const httpParams = {
        ...listQuery,
        pageNum: this.page.page,
        pageSize: this.page.limit
      }
      this.loading = true
      listPage(httpParams)
        .then(response => {
          this.loading = false
          this.selectRowData = []
          this.gridList = response.data.records
          this.total = response.data.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    getListQuery() {
      const listQuery = cloneDeep(this.listQuery)
      return listQuery
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.menu-name {
  height: 56px;
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  line-height: 56px;
  padding-left: 22px;
  font-size: 18px;
}
.button-operation {
  margin-top: 15px;
  height: 40px;
}
.footer-page {
  margin: 10px 0 -10px 0!important;
}
.tabs {
  height: 100%;
  .tab-item {
    color: #666666;
    font-size: 16px;
    width: 96px;
    margin-right: 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .active {
    color: #2059F7;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background: #2059F7;
    }
  }
}
</style>
