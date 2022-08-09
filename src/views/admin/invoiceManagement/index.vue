<template>
  <admin-container class="grid-table">
    <div
      class="grid-body"
      flex="dir:top"
    >
      <div class="menu-name">发票管理</div>
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
            <!--  订单号 -->
            <el-form-item label="订单号：" prop="orderCode">
              <el-input
                v-model.trim="listQuery.orderCode"
                class="roleName"
                placeholder="请输入订单号"
                clearable
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
            <el-form-item label="时间：" prop="dataNo">
              <el-date-picker
                v-model="listQuery.dataNo"
                type="daterange"
                value-format="yyyy-MM-dd"
                :editable="false"
                style="width: 240px;"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                center-placeholder="-"
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
          flex-box="0"
          class="button-operation"
          flex="main:justify"
        >
          <div class="tabs" flex-box="1" flex="cross:center">
            <div v-for="(item, index) in tabList" :key="index" class="tab-item" :class="{ active: activeIndex === index }" @click="changeOrderStatus(item, index)"> {{ item.label }}</div>
          </div>
          <el-button :loading="loading" size="mini" @click="handleExport">导出</el-button>
        </div>
        <div
          flex-box="1"
          class="grid-list"
        >
          <el-table
            :data="gridList"
            stripe
            border
            height="100%"
            style="width: 100%"
            :span-method="objectSpanMethod"
            @row-dblclick="handleDetail"
          >
            <el-table-column
              prop="orderPayId"
              label="订单编号"
              width="160px"
              show-overflow-tooltip
            >
              <!-- <template slot-scope="{ row }">
                <span style="color: #409EFF; cursor: pointer" @click="handleDetail(row)">{{ row.orderPayId }}</span>
              </template> -->
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              width="160px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="goodsCode"
              label="商品编号"
              width="100px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="invoiceTitle"
              label="发票名称(抬头)"
              width="140px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="taxpayerId"
              label="纳税人识别号"
              width="130px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="recipientEmail"
              label="收票人邮箱"
              width="150px"
            />
            <el-table-column
              prop="paymentTime"
              label="付款时间"
              width="160px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="deliveryTime"
              label="发货时间"
              width="160px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="consigneeName"
              label="收货人"
              width="100px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="consigneeMobile"
              label="收货人联系方式"
              width="120px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="orderStatusStr"
              label="订单状态"
              width="100px"
            />
            <el-table-column
              prop="writeOffStr"
              label="核销状态"
              width="110px"
              show-overflow-tooltip
            />
            <el-table-column
              prop="address"
              label="操作"
              width="100px"
              fixed="right"
            >
              <template slot-scope="{ row }">
                <el-button v-if="row.invoiceComplete === 0 && row.writeOff === 1" type="text" size="mini" @click="handleVerification(row)">确认开票</el-button>
              </template>
            </el-table-column>
            <div slot="empty">
              <p><img src="~@/assets/imgs/default_data@2x.png"></p>
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
import util from '@/libs/util'
import qs from 'qs'
import { cloneDeep } from 'lodash'
import pagination from '@/mixins/pagination'
import { getInvoiceList, completeInvoice } from '@/api/admin'

export default {
  name: 'InvoiceManagement',
  mixins: [pagination],
  data() {
    return {
      activeIndex: 0,
      tabList: [
        { label: '全部', code: '' },
        { label: '未开发票', code: 0 },
        { label: '已开发票', code: 1 }
      ],
      listQuery: {
        orderCode: '',
        dataNo: [],
        invoiceComplete: ''
      },
      loading: false,
      spanArr: [], // 第一列进行合并操作时存放的数组变量
      spanPos: 0 // 上面的数组的下标值
    }
  },

  mounted() {
    this.handleFilter()
  },
  methods: {
    changeOrderStatus(item, index) {
      this.activeIndex = index
      this.listQuery.invoiceComplete = item.code
      this.handleFilter()
    },
    // 完成开票
    handleVerification(row) {
      this.$confirm('是否确认完成开票?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        completeInvoice({ orderId: row.orderId }).then(res => {
          this.$message.success('操作成功')
          this.handleFilter()
        })
      }).catch(() => {
      })
    },
    // 导出
    handleExport() {
      const listQuery = this.getListQuery()
      window.open(process.env.VUE_APP_BASE_API + '/api/order/exportInvoiceList' + '?' + qs.stringify(listQuery) + '&token=' + encodeURIComponent(util.getToken()))
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
      getInvoiceList(httpParams)
        .then(response => {
          this.loading = false
          this.selectRowData = []
          this.gridList = response.data.records
          this.total = response.data.total
          this.getEqual()
        })
        .catch(() => {
          this.loading = false
        })
    },
    getListQuery() {
      const listQuery = cloneDeep(this.listQuery)
      const dataNo = listQuery.dataNo
      if (dataNo) {
        listQuery.startDate = dataNo[0] === undefined ? null : dataNo[0]
        listQuery.endDate = dataNo[1] === undefined ? null : dataNo[1]
      }
      delete listQuery.dataNo
      return listQuery
    },
    mergeInit() {
      this.spanArr = []
      this.spanPos = 0
    },
    getEqual() {
      this.mergeInit()
      const gridList = cloneDeep(this.gridList)
      for (let i = 0; i < gridList.length; i += 1) {
        if (i === 0) {
          this.spanArr.push(1)
          this.spanPos = 0
        } else {
          if (gridList[i].orderId === gridList[i - 1].orderId) {
            this.spanArr[this.spanPos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.spanPos = i
          }
        }
      }
    },
    // 合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const arr = [0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      if (arr.includes(columnIndex)) {
        const row1 = this.spanArr[rowIndex]
        const col1 = row1 > 0 ? 1 : 0
        return {
          rowspan: row1,
          colspan: col1
        }
      }
      // if (columnIndex === 0 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6 || columnIndex === 7 || columnIndex === 8 || columnIndex === 9 || columnIndex === 10 || columnIndex === 11 || columnIndex === 12 || columnIndex === 13) {
      //   const row1 = this.spanArr[rowIndex]
      //   const col1 = row1 > 0 ? 1 : 0
      //   return {
      //     rowspan: row1,
      //     colspan: col1
      //   }
      // }
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
