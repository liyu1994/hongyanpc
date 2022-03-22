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
      <div class="group">
        <div class="item" flex="cross:center">
          <svg-icon class="icon" icon-class="ic_number@2x" />
          <div flex-box="1">
            <el-form-item
              label="商品编号"
            >
              {{ form.goodsCode }}
            </el-form-item>
          </div>
        </div>
        <div class="item" flex="cross:center">
          <svg-icon class="icon" icon-class="ic_trade_name@2x" />
          <div flex-box="1">
            <el-form-item
              label="商品名称"
            >
              {{ form.goodsName }}
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="group" style="margin-top: 16px">
        <div class="item">
          <el-form-item
            label="商品类别"
          >
            {{ form.categoryName }}
          </el-form-item>
        </div>
      </div>
      <div class="group" style="margin-top: 16px">
        <div class="item">
          <el-form-item
            label="商品描述"
          >
            {{ form.goodsDescribe }}
          </el-form-item>
        </div>
      </div>
      <div class="group" style="margin-top: 18px">
        <div class="item">
          <el-form-item
            label="库存"
          >
            {{ form.goodsInventory }}
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item
            label="商品价格"
          >
            {{ form.goodsPrice }}
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item
            label="起订量"
          >
            {{ form.goodsMoq }}
          </el-form-item>
        </div>
      </div>
      <div class="group" style="margin-top: 18px">
        <el-form-item
          label="商品缩略图"
        >
          <div style="margin-top: 10px">
            <el-image
              v-for="(item, index) in form.thumbnail"
              :key="index"
              style="display: inline-block; width: 100px; height: 100px; margin-right: 8px"
              :src="item"
              :preview-src-list="form.thumbnail"
            />
          </div>
        </el-form-item>
      </div>
      <div class="group" style="margin-top: 18px">
        <el-form-item
          label="商品照片"
        >
          <div style="margin-top: 10px">
            <el-image
              v-for="(item, index) in form.banner"
              :key="index"
              style="display: inline-block; width: 100px; height: 100px; margin-right: 8px"
              :src="item"
              :preview-src-list="form.banner"
            />
          </div>
        </el-form-item>
      </div>
      <div class="group" style="margin-top: 18px">
        <el-form-item
          label="商品详情照片"
        >
          <div style="margin-top: 10px">
            <el-image
              v-for="(item, index) in form.detailPicture"
              :key="index"
              style="display: inline-block; width: 100px; height: 100px; margin-right: 8px"
              :src="item"
              :preview-src-list="form.detailPicture"
            />
          </div>
        </el-form-item>
      </div>
    </el-form>

    <div slot="footer" class="admin-text-center">
      <el-button @click.native="cancel">取消</el-button>
    </div>
  </admin-drawer>
</template>

<script>
import { cloneDeep } from 'lodash'
import { detail } from '@/api/admin'

const defaultForm = {
  thumbnail: [],
  banner: [],
  detailPicture: []
}

export default {
  name: 'IotDeviceInsertDrawer',
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
      title: '商品详情',
      form: cloneDeep(defaultForm),
      rules: {}
    }
  },
  methods: {
    // 初始化
    async init() {
      detail({ id: this.dialogForm.id })
        .then(res => {
          const { thumbnail, banner, detailPicture } = res.data
          res.data.thumbnail = thumbnail ? [thumbnail.pictureUrl] : []
          res.data.banner = (banner || []).map(item => item.pictureUrl)
          res.data.detailPicture = (detailPicture || []).map(item => item.pictureUrl)
          this.form = res.data
        })
        .catch(() => {
          // this.loading = false
        })
    },
    // 关闭抽递
    cancel() {
      this.dialogForm.visible = false
      this.loading = false
      setTimeout(() => {
        this.$refs['form'].resetFields()
        this.form = cloneDeep(defaultForm)
      }, 200)
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
    background-color: #F6F8F9;
    height: 42px;
    border-radius: 4px;
    margin-bottom: 6px;
    color: #333;
    font-size: 14px;
    .label {
      width: 82px;
      height: 100%;
      background-color: #E5EBEE;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content {
      line-height: 42px;
      span {
        display: inline-block;
        margin: 0 16px;
      }
    }
  }
}
.btn-wrap {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .btn {
    width: 212px;
    height: 45px;
    border-radius: 2px;
    background-color: rgba(246, 248, 249, 1);
    color: #666;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  width: 100%;
}
/deep/ .el-input__inner {
  border-width: 0;
  background: transparent;
  padding: 0;
}
/deep/ .el-form-item.is-success .el-input__inner {
  border-color: transparent;
}
/deep/ .el-textarea__inner {
  background: #f6f8f9;
  border-width: 0;
  margin-top: 6px;
}
/deep/ .pictureupload {
  margin-top: 10px;
}
</style>
