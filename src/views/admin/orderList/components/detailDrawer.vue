<template>
  <admin-drawer
    v-model="dialogForm.visible"
    placement="right"
    :title="title"
    :width.sync="width"
    :min-width="480"
    :before-close="cancel"
    :draggable="draggable"
    :mask-closable="true"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form ref="form" class="drawer-form" :model="form" label-position="top" size="mini" :inline="false" :show-message="true" label-width="160px" :rules="rules">
      <div class="shop-info">
        <div class="shop-info__item">
          <div class="label">商品</div>
          <div class="content">
            <span v-for="(item, index) in detailData.orderGoodsItemVos" :key="index"><i>名称:{{ item.goodsName }}</i><i>价格:{{ item.goodsPrice }}</i><i>编号:{{ item.goodsCode }}</i></span>
          </div>
        </div>
      </div>

      <div class="group" style="margin-top: 16px">
        <div class="item" flex="dir:top main:center">
          <div class="title">收货人</div>
          <div class="content">{{ detailData.shippingAddressVo.consigneeName }}</div>
        </div>
        <div class="item" flex="dir:top main:center">
          <div class="title">收货人联系方式</div>
          <div class="content">{{ detailData.shippingAddressVo.consigneeMobile }}</div>
        </div>
      </div>
      <div class="group" style="margin-top: 16px">
        <div class="item" flex="dir:top main:center">
          <div class="title">收货地址</div>
          <div class="content">{{ detailData.shippingAddressVo.consigneeRegionName }}&nbsp;{{ detailData.shippingAddressVo.consigneeAddress }}</div>
        </div>
      </div>
      <div v-if="detailData.deliveryType === 1" class="group" style="margin-top: 16px">
        <div class="item" flex="dir:top main:center">
          <div class="title">配送信息</div>
          <div class="content">
            <p><span>配送方式</span>自有车辆配送</p>
            <p><span>司机名称</span>{{ detailData.driverName }}</p>
            <p><span>司机联系方式</span>{{ detailData.driverMobile }}</p>
          </div>
        </div>
      </div>
      <div v-if="detailData.deliveryType === 2" class="group" style="margin-top: 16px">
        <div class="item" flex="dir:top main:center">
          <div class="title">配送信息</div>
          <div class="content">
            <p><span>配送方式</span>物流配送</p>
            <p><span>物流公司</span>{{ detailData.logisticsCompany }}</p>
            <p><span>快递单号</span>{{ detailData.trackingNumber }}</p>
          </div>
        </div>
      </div>
    </el-form>

    <div slot="footer" class="admin-text-center">
      <el-button @click.native="cancel">取消</el-button>
    </div>
  </admin-drawer>
</template>

<script>
import util from '@/libs/util.js'
import { cloneDeep } from 'lodash'
import { getOrderDetail, sendOutOrder } from '@/api/admin'

const defaultForm = {
  orderId: '',
  deliveryType: '1',
  driverName: '',
  driverMobile: '',
  logisticsCompany: '',
  trackingNumber: ''
}

export default {
  props: {
    dialogForm: {
      required: true,
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      activeName: '1',
      width: 480,
      draggable: false,
      title: '订单详情',
      form: cloneDeep(defaultForm),
      logisticsCompanyList: ['申通快递', '圆通快递', '顺丰快递', '邮政快递'],
      detailData: {
        orderGoodsItemVos: [],
        shippingAddressVo: {}
      },
      businessPersonDialogForm: {
        visible: false
      },
      controlLiableDialogForm: {
        visible: false
      },
      rules: {},
      type: 'create'
    }
  },
  methods: {
    // 初始化
    async init() {
      const orderId = this.dialogForm.id
      this.loading = true
      getOrderDetail({ orderId })
        .then(res => {
          this.loading = false
          this.detailData = res.data
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleClick() {
      this.form.driverName = ''
      this.form.driverMobile = ''
      this.form.logisticsCompany = ''
      this.form.trackingNumber = ''
    },
    // 关闭抽递
    cancel() {
      this.dialogForm.visible = false
      this.loading = false
      setTimeout(() => {
        this.$refs['form'].resetFields()
        this.form = cloneDeep(defaultForm)
        this.detailData = {
          orderGoodsItemVos: [],
          shippingAddressVo: {}
        }
      }, 200)
    },
    // 新增
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          const form = cloneDeep(this.form)
          form.orderId = this.dialogForm.id
          sendOutOrder(form)
            .then(response => {
              this.loading = false
              this.$message.success('发货成功')
              this.$emit('update')
              this.cancel()
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          util.formElementsFocus({
            vm: this
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item {
    flex: 1;
    min-height: 66px;
    border-radius: 4px;
    background-color: rgba(246, 248, 249, 1);
    padding: 8px 14px;
    .icon {
      margin-right: 8px;
    }
    .title {
      color: #666;
      font-size: 14px;
    }
    .content {
      color: #333;
      font-size: 16px;
      margin-top: 4px;
      p {
        line-height: 14px;
        font-size: 14px;
        span {
          display: inline-block;
          width: 100px;
          color: #666;
          font-size: 14px;
          margin-right: 20px;
        }
      }
    }
  }
  .item + .item {
    margin-left: 8px;
  }
}
.shop-info {
  margin-top: 18px;
  &__item {
    width: 100%;
    background-color: #F6F8F9;
    min-height: 42px;
    border-radius: 4px;
    margin-bottom: 6px;
    color: #333;
    font-size: 14px;
    // white-space: nowrap;
    position: relative;
    .label {
      width: 82px;
      height: 100%;
      background-color: #E5EBEE;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
    }
    .content {
      padding-left: 82px;
      display: inline-block;
      // line-height: 42px;
      background-color: #F6F8F9;
      span {
        display: block;
        margin: 8px 16px;
        line-height: 22px;
        // text-align: center;
        i {
          font-style: normal;
          padding-right: 8px;
        }
      }
    }
  }
}
/deep/ .el-form-item__label {
  padding: 0;
  position: relative;
  line-height: 20px;
}
/deep/ .el-form-item__label:before {
  position: absolute;
  right: -12px;
  top: 3px;
}
/deep/ .el-form-item {
  margin-bottom: 0;
}
/deep/ .el-input__inner {
  border-width: 0;
  background: transparent;
  padding: 0;
}
/deep/ .el-form-item.is-success .el-input__inner {
  border-color: transparent;
}
</style>
