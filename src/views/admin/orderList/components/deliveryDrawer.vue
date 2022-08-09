<template>
  <admin-drawer
    v-model="dialogForm.visible"
    placement="right"
    :title="title"
    :width.sync="width"
    :min-width="480"
    :before-close="cancel"
    :draggable="draggable"
    :mask-closable="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-tabs v-model="form.deliveryType" @tab-click="handleClick">
      <el-tab-pane label="自有车辆配送" name="1" />
      <el-tab-pane label="物流配送" name="2" />
    </el-tabs>
    <el-form ref="form" class="drawer-form" :model="form" label-position="top" size="mini" :inline="false" :show-message="true" label-width="160px" :rules="rules">
      <div v-if="form.deliveryType === '1'" class="group">
        <div class="item" flex="cross:center">
          <svg-icon class="icon" icon-class="ic_driver@2x" />
          <div flex-box="1">
            <el-form-item
              label="司机姓名"
              prop="driverName"
              :rules="$rules({ required: true, message: '请输入司机姓名' })"
            >
              <el-input
                v-model.trim="form.driverName"
                style="width: 100%"
                placeholder="请输入司机姓名"
                clearable
                maxlength="30"
              />
            </el-form-item>
          </div>
        </div>
        <div class="item" flex="cross:center">
          <svg-icon class="icon" icon-class="ic_phone@2x" />
          <div flex-box="1">
            <el-form-item
              label="司机联系方式"
              prop="driverMobile"
              :rules="$rules({ required: true, type: 'mobile', message: '请输入司机联系方式' })"
            >
              <el-input
                v-model.trim="form.driverMobile"
                style="width: 100%"
                placeholder="请输入司机联系方式"
                clearable
                maxlength="30"
              />
            </el-form-item>
          </div>
        </div>
      </div>
      <div v-if="form.deliveryType === '2'" class="group">
        <div class="item" flex="cross:center">
          <svg-icon class="icon" icon-class="ic_driver@2x" />
          <div flex-box="1">
            <el-form-item
              label="快递公司"
              prop="logisticsCompany"
              :rules="$rules({ required: true, message: '请选择快递公司' })"
            >
              <el-select v-model="form.logisticsCompany" placeholder="请选择">
                <el-option
                  v-for="(item,index) in logisticsCompanyList"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item" flex="cross:center">
          <svg-icon class="icon" icon-class="ic_phone@2x" />
          <div flex-box="1">
            <el-form-item
              label="快递单号"
              prop="trackingNumber"
              :rules="$rules({ required: true, message: '请输入快递单号' })"
            >
              <el-input
                v-model.trim="form.trackingNumber"
                style="width: 100%"
                placeholder="请输入快递单号"
                clearable
                maxlength="30"
              />
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="shop-info">
        <!-- <el-scrollbar> -->
        <div class="shop-info__item">
          <div class="label">商品</div>
          <div class="content">
            <span v-for="(item, index) in detailData.orderGoodsItemVos" :key="index">{{ item.goodsName }}（价格{{ item.goodsPrice }}）</span>
          </div>
        </div>
        <!-- <div class="shop-info__item">
          <div class="label">商品价格</div>
          <div class="content">
            <span v-for="(item, index) in detailData.orderGoodsItemVos" :key="index">{{ item.goodsPrice }}</span>
            <span v-for="(item, index) in detailData.orderGoodsItemVos" :key="index">{{ item.goodsPrice }}</span>
            <span v-for="(item, index) in detailData.orderGoodsItemVos" :key="index">{{ item.goodsPrice }}</span>
            <span v-for="(item, index) in detailData.orderGoodsItemVos" :key="index">{{ item.goodsPrice }}</span>
            <span v-for="(item, index) in detailData.orderGoodsItemVos" :key="index">{{ item.goodsPrice }}</span>
            <span v-for="(item, index) in detailData.orderGoodsItemVos" :key="index">{{ item.goodsPrice }}</span>
          </div>
        </div> -->
        <!-- </el-scrollbar> -->
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
    </el-form>

    <div slot="footer" class="admin-text-center">
      <el-button @click.native="cancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click.native="create('form')">保 存</el-button>
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
      title: '去发货',
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
      this.$refs['form'].resetFields()
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
