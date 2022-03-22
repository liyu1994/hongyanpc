<template>
  <div class="upload-container">
    <!--<el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">上传图片-->
    <el-button icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">上传图片
    </el-button>
    <el-dialog title="图片上传" :visible.sync="dialogVisible" append-to-body>
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :on-error="handleError"
        :headers="myHeaders"
        class="editor-slide-upload"
        :action="imgURL"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <vue-gallery :id="`${id}`" :images="images" :index="index" :options="{ closeOnSlideClick: true }" @close="index = null" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from '@/libs/util'
import { uniqueId } from 'lodash'
import VueGallery from 'vue-gallery'

export default {
  name: 'EditorSlideUpload',
  components: {
    VueGallery
  },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      myHeaders: { token: util.getToken() },
      dialogVisible: false,
      listObj: {},
      fileList: [],
      // 图片上传格式
      validExtensions: ['gif', 'png', 'jpg', 'jpeg'],
      imgURL: global.zh.uploadURL,
      // 图片预览
      images: [],
      index: null,
      id: 'vue-images-' + uniqueId()
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handlePictureCardPreview(file) {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      this.images = Object.keys(this.listObj).map(v => this.listObj[v].url)
      this.index = arr.findIndex(item => item.uid === file.uid)
    },
    handleSuccess(response, file, fileList) {
      if (response.status !== 200) {
        const uid = file.uid
        this.handleRemove(file)
        fileList.forEach((row, index) => {
          if (row.uid === uid) {
            fileList.splice(index, 1)
          }
        })
        this.$message.error('图片上传失败！')
        return
      }
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          // this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].url = response.data
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    // 文件上传失败
    handleError(err, file, fileList) {
      this.$message.error(`${err.type} 文件上传失败`)
      this.handleRemove(file)
    },
    beforeUpload(file) {
      const ext = file.name.split('.').pop().toLowerCase()
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!this.validExtensions.includes(ext)) {
        this.$message.error('照片只能是 ' + this.validExtensions.join(', ') + ' 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('照片大小不能超过 5MB!')
        return false
      }
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  .el-upload--picture-card {
    width: 100%;
  }
}
</style>
