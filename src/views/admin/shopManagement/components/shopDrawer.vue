<template>
  <admin-drawer
    v-model="dialogForm.visible"
    placement="right"
    :title="title[type]"
    :width.sync="width"
    :min-width="480"
    :before-close="cancel"
    :draggable="draggable"
    :mask-closable="false"
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
              prop="goodsCode"
              :rules="$rules({ required: true, message: '请输入商品编号' })"
            >
              <el-input
                v-model.trim="form.goodsCode"
                style="width: 100%"
                placeholder="请输入商品编号"
                clearable
                maxlength="30"
              />
            </el-form-item>
          </div>
        </div>
        <div class="item" flex="cross:center">
          <svg-icon class="icon" icon-class="ic_trade_name@2x" />
          <div flex-box="1">
            <el-form-item
              label="商品名称"
              prop="goodsName"
              :rules="$rules({ required: true, message: '请输入商品名称' })"
            >
              <el-input
                v-model.trim="form.goodsName"
                style="width: 100%"
                placeholder="请输入商品名称"
                :disabled="type === 'update'"
                clearable
                maxlength="30"
              />
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="group" style="margin-top: 16px">
        <div class="item" flex="cross:center">
          <!-- <svg-icon class="icon" icon-class="ic_number@2x" /> -->
          <div flex-box="1">
            <el-form-item
              label="商品类型"
              prop="categoryId"
              :rules="$rules({ required: true, message: '请选择商品类型' })"
            >
              <el-select v-model="form.categoryId" style="width: 100%" filterable placeholder="请选择商品类别">
                <el-option
                  v-for="(item,index) in option"
                  :key="index"
                  :label="item.categoryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="group" style="margin-top: 16px">
        <el-form-item
          label="商品描述"
          prop="goodsDescribe"
          :rules="$rules({ required: true, message: '请输入商品描述' })"
        >
          <el-input
            v-model.trim="form.goodsDescribe"
            type="textarea"
            style="width: 100%"
            placeholder="请输入商品描述"
            :disabled="type === 'update'"
            rows="4"
            maxlength="300"
          />
        </el-form-item>
      </div>
      <div class="group" style="margin-top: 18px">
        <div class="item">
          <el-form-item
            label="库存"
            prop="goodsInventory"
            :rules="$rules({ required: true, message: '请输入库存' })"
          >
            <el-input-number v-model="form.goodsInventory" style="width: 100%" controls-position="right" placeholder="请输入" />
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item
            label="商品价格"
            prop="goodsPrice"
            :rules="$rules({ required: true, message: '请输入商品价格' })"
          >
            <el-input-number v-model="form.goodsPrice" style="width: 100%" controls-position="right" placeholder="请输入" />
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item
            label="起订量"
            prop="goodsMoq"
            :rules="$rules({ required: true, message: '请输入起订量' })"
          >
            <el-input-number v-model="form.goodsMoq" style="width: 100%" controls-position="right" placeholder="请输入" />
          </el-form-item>
        </div>
      </div>
      <div class="group" style="margin-top: 18px">
        <el-form-item
          label="商品缩略图"
          prop="thumbnail"
          :rules="$rules({ required: true, message: '请上传商品缩略图' })"
        >
          <admin-upload ref="wasteCodeUrls" v-model="form.thumbnail" class="upload-mini" :limit="1" />
        </el-form-item>
      </div>
      <div class="group" style="margin-top: 18px">
        <el-form-item
          label="商品照片"
          prop="banner"
          :rules="$rules({ required: true, message: '请上传商品照片' })"
        >
          <admin-upload ref="wasteCodeUrls" v-model="form.banner" class="upload-mini" :limit="3" />
        </el-form-item>
      </div>
      <div class="group" style="margin-top: 18px">
        <el-form-item
          label="商品详情照片"
          prop="detailPicture"
          :rules="$rules({ required: true, message: '请上传商品详情照片' })"
        >
          <admin-upload ref="wasteCodeUrls" v-model="form.detailPicture" class="upload-mini" :limit="5" />
        </el-form-item>
      </div>
      <div v-if="type === 'create'" class="group" style="margin-top: 18px">
        <el-form-item
          label="是否立即上架"
        >
          <div class="btn-wrap">
            <div class="btn" :class="{ active: form.goodsStatus === 1 }" @click="form.goodsStatus = 1">是</div>
            <div class="btn" :class="{ active: form.goodsStatus === 0 }" @click="form.goodsStatus = 0">否</div>
          </div>
        </el-form-item>
      </div>
    </el-form>

    <div slot="footer" class="admin-text-center">
      <el-button @click.native="cancel">取消</el-button>
      <el-button v-if="type === 'create'" type="primary" :loading="loading" @click.native="create('form')">保 存</el-button>
      <el-button v-else type="primary" :loading="loading" @click.native="update('form')">保 存</el-button>
    </div>
  </admin-drawer>
</template>

<script>
import util from '@/libs/util.js'
import { cloneDeep } from 'lodash'
import { addGoods, detail, editGoods, goodsCategoryList } from '@/api/admin'

const defaultForm = {
  goodsCode: '',
  goodsName: '',
  goodsDescribe: '',
  goodsPrice: '',
  goodsInventory: '',
  goodsMoq: '',
  goodsStatus: 0,
  thumbnail: [],
  banner: [],
  detailPicture: [],
  categoryId: ''
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
      width: 480,
      draggable: false,
      title: {
        create: '商品新增',
        update: '编辑商品'
      },
      form: cloneDeep(defaultForm),
      businessPersonDialogForm: {
        visible: false
      },
      controlLiableDialogForm: {
        visible: false
      },
      rules: {},
      type: 'create',
      option: []
    }
  },
  methods: {
    // 初始化
    async init() {
      this.type = this.dialogForm.type || 'create'
      // this.option = this.dialogForm.option || []
      goodsCategoryList({
        showInHome: 0
      }).then(res => {
        this.option = res.data || []
      })
      if (this.type === 'update') {
        detail({ id: this.dialogForm.id })
          .then(res => {
            const { thumbnail, banner, detailPicture } = res.data
            res.data.thumbnail = thumbnail ? [{
              name: thumbnail.pictureName,
              url: thumbnail.pictureUrl,
              size: thumbnail.pictureSize
            }] : []
            res.data.banner = (banner || []).map(item => {
              return {
                name: item.pictureName,
                url: item.pictureUrl,
                size: item.pictureSize
              }
            })
            res.data.detailPicture = (detailPicture || []).map(item => {
              return {
                name: item.pictureName,
                url: item.pictureUrl,
                size: item.pictureSize
              }
            })
            this.form = res.data
          })
          .catch(() => {
          })
      }
    },
    // 关闭抽递
    cancel() {
      this.dialogForm.visible = false
      this.loading = false
      setTimeout(() => {
        this.$refs['form'].resetFields()
        this.form = cloneDeep(defaultForm)
      }, 200)
    },
    // 新增
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          const form = cloneDeep(this.form)
          const { thumbnail, banner, detailPicture } = form
          form.thumbnail = {
            pictureName: thumbnail[0].name,
            pictureUrl: thumbnail[0].url,
            pictureSize: thumbnail[0].size,
            pictureSequence: 0
          }
          form.banner = banner.map((item, index) => {
            return {
              pictureName: item.name,
              pictureUrl: item.url,
              pictureSize: item.size,
              pictureSequence: index
            }
          })
          form.detailPicture = detailPicture.map((item, index) => {
            return {
              pictureName: item.name,
              pictureUrl: item.url,
              pictureSize: item.size,
              pictureSequence: index
            }
          })
          addGoods(form)
            .then(response => {
              this.loading = false
              this.$message.success('新增成功')
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
    },
    // 修改
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          const form = cloneDeep(this.form)
          const { thumbnail, banner, detailPicture } = form
          form.thumbnail = {
            pictureName: thumbnail[0].name,
            pictureUrl: thumbnail[0].url,
            pictureSize: thumbnail[0].size,
            pictureSequence: 0
          }
          form.banner = banner.map((item, index) => {
            return {
              pictureName: item.name,
              pictureUrl: item.url,
              pictureSize: item.size,
              pictureSequence: index
            }
          })
          form.detailPicture = detailPicture.map((item, index) => {
            return {
              pictureName: item.name,
              pictureUrl: item.url,
              pictureSize: item.size,
              pictureSequence: index
            }
          })
          editGoods(form)
            .then(response => {
              this.loading = false
              this.$message.success('编辑成功')
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
    cursor: pointer;
  }
  .active {
    color: #1677FF;
    background: #E8F2FF url('~@/assets/imgs/ic_click@2x 2.png') no-repeat right bottom;
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
