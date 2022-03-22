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
    <el-form ref="form" class="drawer-form" :model="form" label-position="top" size="mini" :inline="false" :show-message="true" label-width="160px" :rules="rules">
      <div class="shop-info">
        <div class="shop-info__item">
          <div class="label">付款流水号</div>
          <div class="content">
            {{ detailData.paymentSerialNumber }}
          </div>
        </div>
      </div>

      <div class="group" style="margin-top: 16px">
        <div class="item" flex="dir:top main:center">
          <div class="title">支付凭证</div>
          <div class="content">
            <el-image
              style="display: inline-block; width: 130px; height: 130px; margin-top: 14px"
              :src="detailData.paymentDocument"
              fit="cover"
              :preview-src-list="[detailData.paymentDocument]"
            />
          </div>
        </div>
      </div>

      <div class="group" style="margin-top: 16px">
        <div class="item" flex="dir:top main:center">
          <el-form-item
            label="原因"
            prop="writeOffRefusalReason"
          >
            <el-input
              v-model.trim="form.writeOffRefusalReason"
              type="textarea"
              style="width: 100%"
              placeholder="请填写核销不通过原因"
              rows="4"
              maxlength="300"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div slot="footer" class="admin-text-center">
      <el-button type="primary" :loading="loading" @click.native="create(1)">完成核销</el-button>
      <el-button type="primary" :loading="loading" @click.native="create(2)">拒绝核销</el-button>
      <el-button @click.native="cancel">取消</el-button>
    </div>
  </admin-drawer>
</template>

<script>
import { cloneDeep } from 'lodash'
import { getOrderDetail, writeOffOrder } from '@/api/admin'

const defaultForm = {
  writeOffRefusalReason: ''
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
      title: '核销订单',
      form: cloneDeep(defaultForm),
      detailData: {},
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
        this.detailData = {}
      }, 200)
    },
    // 新增
    create(writeOffStatus) {
      if (writeOffStatus === 2 && !this.form.writeOffRefusalReason) {
        this.$message.error('请填写核销不通过原因')
        return false
      }
      this.loading = true
      const data = {
        orderId: this.detailData.orderId,
        writeOffStatus,
        writeOffRefusalReason: this.form.writeOffRefusalReason
      }
      writeOffOrder(data)
        .then(response => {
          this.loading = false
          this.$message.success('操作成功')
          this.$emit('update')
          this.cancel()
        })
        .catch(() => {
          this.loading = false
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
    height: 42px;
    border-radius: 4px;
    margin-bottom: 6px;
    color: #333;
    font-size: 14px;
    display: flex;
    align-items: center;
    .label {
      width: 112px;
      height: 42px;
      background-color: #E5EBEE;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content {
      padding-left: 12px;
      display: inline-block;
      background-color: #F6F8F9;
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
