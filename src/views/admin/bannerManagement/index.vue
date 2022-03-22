<template>
  <admin-container class="grid-table">
    <div
      class="grid-body"
      flex="dir:top"
    >
      <div class="menu-name">轮播图管理</div>
      <div class="admin-p admin-bg-white" style="margin: 20px" flex="dir:top" flex-box="1">
        <div class="img-wrap">
          <div
            v-for="(item, index) in bannerList"
            :key="index"
            class="img-item"
          >
            <el-image
              style="width: 100%; height: 100%"
              :src="item.pictureUrl"
              :preview-src-list="bannerList.map(i => i.pictureUrl)"
            />
            <div class="mark">
              <el-button size="mini" @click="handleEdit(item)">编辑</el-button>
              <el-button size="mini" @click="handleRemove(item)">删除</el-button>
            </div>
          </div>
          <el-upload
            class="el-upload"
            action=""
            list-type="picture-card"
            :http-request="handleUploadSuccess"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :accept="extensions.join(',')"
          >
            <i slot="default" class="el-icon-plus" />
            <div style="font-size: 22px; margin-top: 15px">{{ bannerList.length }}/5</div>
          </el-upload>
          <el-upload
            ref="upload"
            style="display: none"
            class="el-upload"
            action=""
            list-type="picture-card"
            :http-request="handleEditUploadSuccess"
            :before-upload="beforeEditAvatarUpload"
            :show-file-list="false"
            :accept="extensions.join(',')"
          >
            <i slot="default" class="el-icon-plus" />
            <div style="font-size: 22px; margin-top: 15px">{{ bannerList.length }}/5</div>
          </el-upload>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </admin-container>
</template>

<script>
// import { cloneDeep } from 'lodash'
import pagination from '@/mixins/pagination'
import { bannerList, upLoad, bannerAdd, bannerEdit, bannerRemove } from '@/api/admin'

export default {
  name: 'MemberManagement',
  mixins: [pagination],
  data() {
    return {
      bannerList: [],
      list: [],
      loading: false,
      dialogVisible: false,
      disabled: false,
      dialogImageUrl: '',
      extensions: ['.gif', '.png', '.jpg', '.jpeg', '.svg'],
      selectId: ''
    }
  },

  mounted() {
    this.getList()
  },
  methods: {
    handleRemove(file) {
      bannerRemove({
        bannerId: file.id
      }).then(res => {
        this.$message.success('删除成功')
        this.getList()
      })
    },
    handleEdit(file) {
      this.selectId = file.id
      this.$refs.upload.$refs['upload-inner'].handleClick()
    },
    beforeAvatarUpload(file) {
      if (this.bannerList.length >= 5) {
        this.$message.error('最多上传五张!')
        return false
      }
      const isLt100M = file.size / 1024 / 1024 < 100
      if (!isLt100M) {
        this.$message.error('上传文件不能超过 100MB!')
      }
      return isLt100M
    },
    handleUploadSuccess(file) {
      var fd = new FormData()
      fd.append('file', file.file)
      upLoad(fd).then(res => {
        bannerAdd({
          pictureUrl: res.data.uri
        }).then(() => {
          this.$message.success('新增成功')
          this.getList()
        })
      })
        .catch(() => {
        })
    },
    beforeEditAvatarUpload(file) {
      const isLt100M = file.size / 1024 / 1024 < 100
      if (!isLt100M) {
        this.$message.error('上传文件不能超过 100MB!')
      }
      return isLt100M
    },
    handleEditUploadSuccess(file) {
      var fd = new FormData()
      fd.append('file', file.file)
      upLoad(fd).then(res => {
        bannerEdit({
          bannerId: this.selectId,
          pictureUrl: res.data.uri
        }).then(() => {
          this.selectId = ''
          this.$message.success('编辑成功')
          this.getList()
        }).catch(() => {
          this.selectId = ''
        })
      })
        .catch(() => {
        })
    },
    //  获取接口列表
    getList() {
      this.loading = true
      this.bannerList = []
      bannerList()
        .then(response => {
          this.loading = false
          this.bannerList = response.data
          // this.list = this.bannerList.map(i => {
          //   return {
          //     id: i.id,
          //     url: i.pictureUrl
          //   }
          // })
        })
        .catch(() => {
          this.loading = false
        })
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
.img-wrap {
  display: flex;
  justify-content: flex-start;
  .img-item {
    width: 200px;
    height: 200px;
    margin-right: 15px;
    position: relative;
    .mark {
      width: 100%;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.45);
      padding: 5px 0;
      display: none;
    }
  }
  .img-item:hover {
    .mark {
      display: block;
    }
  }
  /deep/ .el-upload-list__item {
    width: 200px;
    height: 200px;
  }
  /deep/ .el-upload--picture-card {
    width: 200px;
    height: 200px;
    line-height: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
