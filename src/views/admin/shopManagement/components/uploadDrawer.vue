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
      <div class="group" style="margin-top: 16px">
        <div class="item" flex="dir:top main:center">
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
      <div class="group" style="margin-top: 16px">
        <el-upload
          class="upload-btn"
          action=""
          :disabled="!form.categoryId"
          :http-request="handleUploadSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          accept=""
        >
          <el-button
            :disabled="!form.categoryId"
            size="mini"
          >导入商品</el-button>
        </el-upload>
      </div>
    </el-form>

    <div slot="footer" class="admin-text-center">
      <el-button @click.native="cancel">取消</el-button>
    </div>
  </admin-drawer>
</template>

<script>
import { cloneDeep } from 'lodash'
import { importGoods, goodsCategoryList } from '@/api/admin'

const defaultForm = {
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
      activeName: '1',
      width: 480,
      draggable: false,
      title: '导入商品',
      form: cloneDeep(defaultForm),
      option: [],
      rules: {},
      type: 'create'
    }
  },
  methods: {
    // 初始化
    async init() {
      goodsCategoryList().then(res => {
        this.option = res.data || []
      })
      // this.option = this.dialogForm.option || []
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
    beforeAvatarUpload(file) {
      const isLt100M = file.size / 1024 / 1024 < 100
      if (!isLt100M) {
        this.$message.error('上传文件不能超过 100MB!')
      }
      return isLt100M
    },
    handleUploadSuccess(file) {
      var fd = new FormData()
      fd.append('categoryId', this.form.categoryId)
      fd.append('file', file.file)
      importGoods(fd).then(() => {
        this.$message.success('上传成功')
        this.$emit('update')
      })
        .catch(() => {
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
