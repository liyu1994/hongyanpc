<template>
  <admin-container class="grid-table">
    <div
      class="grid-body"
      flex="dir:top"
    >
      <div class="menu-name">商品管理</div>
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
            <!--  商品名称 -->
            <el-form-item label="商品名称：" prop="goodsName">
              <el-input
                v-model.trim="listQuery.goodsName"
                class="roleName"
                placeholder="请输入商品名称"
                clearable
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
            <!--  商品编号 -->
            <el-form-item label="商品编号：" prop="goodsCode">
              <el-input
                v-model.trim="listQuery.goodsCode"
                class="roleName"
                placeholder="请输入商品编号"
                clearable
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
            <!--  商品类别 -->
            <el-form-item label="商品类别：" prop="categoryId">
              <el-select v-model="listQuery.categoryId" filterable clearable placeholder="请选择商品类别">
                <el-option
                  v-for="(item,index) in option"
                  :key="index"
                  :label="item.categoryName"
                  :value="item.id"
                />
              </el-select>
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
          flex-box="0"
          class="button-operation"
          flex="main:justify"
        >
          <div class="tabs" flex-box="1" flex="cross:center">
            <div v-for="(item, index) in tabList" :key="index" class="tab-item" :class="{ active: activeIndex === index }" @click="changeGoodsStatus(item, index)"> {{ item.label }}</div>
          </div>
          <el-button
            :loading="loading"
            type="primary"
            size="mini"
            @click="handleCreate"
          >新增</el-button>
          <!-- <el-upload
            class="upload-btn"
            action=""
            :http-request="handleUploadSuccess"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            accept=""
          > -->
          <el-button
            :loading="loading"
            size="mini"
            style="margin: 0 10px"
            @click="handleUpload"
          >导入商品</el-button>
          <!-- </el-upload> -->
          <el-button
            :loading="loading"
            size="mini"
            @click="handleExport"
          >商品导入模板下载</el-button>
        </div>
        <div
          flex-box="1"
          class="grid-list"
        >
          <el-table
            :data="gridList"
            stripe
            height="100%"
            style="width: 100%"
            @row-dblclick="handleDetail"
          >
            <el-table-column
              prop="goodsCode"
              label="商品编号"
              width="160px"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <span style="color: #409EFF; cursor: pointer" @click="handleDetail(row)">{{ row.goodsCode }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              min-width="280px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="categoryName"
              label="商品类别"
              width="180px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="goodsDescribe"
              label="商品描述"
              min-width="200px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="goodsPrice"
              label="商品价格"
              width="100px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="goodsSales"
              label="销售量"
              width="80px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="goodsInventory"
              label="库存量"
              width="100px"
              show-overflow-tooltip
            />
            <el-table-column
              label="商品照片"
              width="130px"
            >
              <template slot-scope="{ row }">
                <div style="padding-top: 2px" flex="main:center">
                  <el-image
                    v-for="(item, index) in row.banner"
                    :key="index"
                    style="display: inline-block; width: 30px; height: 30px; margin-right: 4px"
                    :src="item"
                    :preview-src-list="row.banner"
                  />
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="address"
              label="商品详情照片"
              width="200px"
            >
              <template slot-scope="{ row }">
                <div style="padding-top: 2px" flex="main:center">
                  <el-image
                    v-for="(item, index) in row.detailPicture"
                    :key="index"
                    style="display: inline-block; width: 30px; height: 30px; margin-right: 4px"
                    :src="item"
                    :preview-src-list="row.detailPicture"
                  />
                </div>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="address"
              label="操作"
              width="150px"
              fixed="right"
            >
              <template slot-scope="{ row }">
                <el-button v-if="row.goodsStatus === 0 || row.goodsStatus === 2" type="text" size="mini" @click="handleUpOrDownStand(row)">上架</el-button>
                <el-button v-if="row.goodsStatus === 1" type="text" size="mini" @click="handleUpOrDownStand(row)">下架</el-button>
                <el-button v-if="row.goodsStatus !== 1" type="text" size="mini" @click="handleEdit(row)">编辑</el-button>
              </template>
            </el-table-column>
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
    <shop-drawer
      ref="shopDrawer"
      :dialog-form="shopDrawerForm"
      @update="handleFilter"
    />
    <detail-drawer
      ref="detailDrawer"
      :dialog-form="detailDrawerForm"
    />
    <upload-drawer
      ref="uploadDrawer"
      :dialog-form="uploadDrawerForm"
      :update="handleFilter"
    />
  </admin-container>
</template>

<script>
import util from '@/libs/util'
import { cloneDeep } from 'lodash'
import pagination from '@/mixins/pagination'
import elements from '@/mixins/elementsPermission'
import shopDrawer from './components/shopDrawer'
import detailDrawer from './components/detailDrawer'
import uploadDrawer from './components/uploadDrawer'
import { goodsListPage, upOrDownStand, goodsCategoryList } from '@/api/admin'

export default {
  name: 'ShopManagement',
  components: { shopDrawer, detailDrawer, uploadDrawer },
  mixins: [pagination, elements],
  data() {
    return {
      activeIndex: 0,
      tabList: [
        { label: '全部', code: '' },
        { label: '待上架', code: 0 },
        { label: '在售中', code: 1 },
        { label: '已下架', code: 2 },
        { label: '已售罄', code: 3 }
      ],
      shopDrawerForm: {
        visible: false
      },
      detailDrawerForm: {
        visible: false
      },
      uploadDrawerForm: {
        visible: false
      },
      listQuery: {
        goodsName: '',
        goodsCode: '',
        goodsStatus: ''
      },
      option: [],
      loading: false
    }
  },

  mounted() {
    goodsCategoryList().then(res => {
      this.option = res.data
    })
    this.handleFilter()
  },
  methods: {
    changeGoodsStatus(item, index) {
      this.activeIndex = index
      this.listQuery.goodsStatus = item.code
      this.handleFilter()
    },
    // 新增商品
    handleCreate() {
      Object.assign(this.shopDrawerForm, {
        visible: true,
        type: 'create',
        option: this.option
      })
      this.$nextTick(() => {
        this.$refs.shopDrawer.init()
      })
    },
    // 编辑商品
    handleEdit(row) {
      Object.assign(this.shopDrawerForm, {
        visible: true,
        type: 'update',
        id: row.id,
        option: this.option
      })
      this.$nextTick(() => {
        this.$refs.shopDrawer.init()
      })
    },
    // 上架或者下架
    handleUpOrDownStand(row) {
      const data = {
        id: row.id,
        status: row.goodsStatus === 0 || row.goodsStatus === 2 ? 1 : 2
      }
      upOrDownStand(data).then(res => {
        this.$message.success('操作成功')
        this.handleFilter()
      })
    },
    // 详情
    handleDetail(row) {
      Object.assign(this.detailDrawerForm, {
        visible: true,
        id: row.id
      })
      this.$nextTick(() => {
        this.$refs.detailDrawer.init()
      })
    },
    // 上传商品
    handleUpload() {
      Object.assign(this.uploadDrawerForm, {
        visible: true,
        option: this.option
      })
      this.$nextTick(() => {
        this.$refs.uploadDrawer.init()
      })
    },
    // 导出
    handleExport() {
      window.open(process.env.VUE_APP_BASE_API + '/api/goods/downloadTemplate' + '?' + 'token=' + encodeURIComponent(util.getToken()))
    },
    //  获取接口列表
    getList() {
      const listQuery = this.getListQuery()
      const httpParams = {
        ...listQuery,
        pageNum: this.page.page,
        pageSize: this.page.limit
      }
      this.loading = true
      goodsListPage(httpParams)
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
      const dataNo = listQuery.dataNo
      if (dataNo) {
        listQuery.startTime = dataNo[0] === undefined ? null : dataNo[0] + ' 00:00:00'
        listQuery.endTime = dataNo[1] === undefined ? null : dataNo[1] + ' 23:59:59'
      }
      delete listQuery.dataNo
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
