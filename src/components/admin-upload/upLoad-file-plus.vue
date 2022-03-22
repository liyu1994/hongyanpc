<template>
  <div class="fileUpload">
    <el-upload
      ref="upload"
      :action="imgURL"
      name="file"
      multiple
      :accept="extensions.join(',')"
      :file-list="imgList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :before-upload="handleUpload"
      :on-error="handleError"
      :headers="headers"
      :limit="limit"
    >
      <div><i class="iconfont iconic_upload_files" /> 选择文件 ({{ size }}M以内)</div>
      <div
        slot="tip"
        class="el-upload__tip"
      >支持{{ extensions.join('') }}</div>
    </el-upload>
    <vue-gallery
      :id="`${id}`"
      :images="images"
      :index="index"
      :options="{ closeOnSlideClick: true }"
      @close="index = null"
    />
  </div>
</template>
<script>
import util from '@/libs/util'
import { uniqueId, remove } from 'lodash'
import VueGallery from 'vue-gallery'

export default {
  components: {
    VueGallery
  },
  props: {
    // 图片列表
    value: {
      required: true,
      default: () => [],
      type: Array
    },
    extensions: {
      default: () => [],
      type: Array
    },
    // 图片数量限制
    limit: {
      default: () => 20,
      type: Number
    },
    // 图片大小限制
    size: {
      default: () => 5,
      type: Number
    }
  },
  data() {
    return {
      // 请求地址
      imgURL: global.zh.uploadURLPlus,
      // fileList: [],
      // listObj: {},
      // 接口调用token
      headers: {
        Authorization: util.getToken()
      },
      images: [],
      index: null,
      id: 'vue-images-' + uniqueId()
    }
  },
  computed: {
    imgList: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    // 清空上传文件
    clearFiles() {
      // this.listObj = {}
      this.imgList = []
      this.$refs.upload.clearFiles()
    },
    // 图片上传前
    handleUpload(file) {
      console.log(this.imgURL)
      // const ext = file.name
      //   .split('.')
      //   .pop()
      //   .toLowerCase()
      const index = file.name.lastIndexOf('.')
      const ext = file.name.substr(index).toLowerCase()
      const isLt2M = file.size / 1024 / 1024 < this.size
      if (!this.extensions.includes(ext)) {
        this.$message.error('上传文件只能是 ' + this.extensions.join(', ') + ' 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('大小不能超过 ' + this.size + 'MB!')
        return false
      }
      // // const _self = this
      // const _URL = window.URL || window.webkitURL
      // // const fileName = file.uid
      // // this.listObj[fileName] = {}
      // return new Promise((resolve, reject) => {
      //   const img = new Image()
      //   img.src = _URL.createObjectURL(file)
      //   img.onload = () => {
      //     this.imgList.push({ hasSuccess: false, uid: file.uid, url: img.src, name: file.name, width: this.width, height: this.height })
      //     // _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, url: img.src, name: file.name, width: this.width, height: this.height }
      //   }
      //   resolve(true)
      // })
      this.imgList.push({ hasSuccess: false, uid: file.uid, url: file.src, name: file.name })
    },
    // 图片移除时处理数据
    handleRemove(file, fileList) {
      const uid = file.uid
      const imgList = [...this.imgList]
      remove(imgList, item => item.uid === uid)
      this.imgList = imgList
      /* const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            delete this.listObj[objKeyArr[i]]
          }
        } */
      this.handleUpdate()
    },
    // 文件上传失败
    handleError(err, file, fileList) {
      const data = JSON.parse(err.toString().replace(/Error: /, ''))
      this.$message.error(data.message)
      this.handleRemove(file)
    },
    handlePictureCardPreview(file) {
      const a = document.createElement('a')
      a.href = file.url
      a.download = file.name
      a.click()
    },
    // 判断图片数量
    handleExceed(files, fileList) {
      this.$message.error(`当前最多上传 ${this.limit} 个文件`)
    },
    checkAllSuccess() {
      // return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
      return this.imgList.every(item => item.hasSuccess)
    },
    // 上传图片成功事件
    handleSuccess(response, file, fileList) {
      if (response.status !== 200) {
        const uid = file.uid
        this.handleRemove(file)
        fileList.forEach((row, index) => {
          if (row.uid === uid) {
            fileList.splice(index, 1)
          }
        })
        this.$message.error(response.message)
        return
      }
      const uid = file.uid
      const index = this.imgList.findIndex(item => item.uid === uid)
      this.imgList[index].hasSuccess = true
      const res = response.data
      // console.log(res)
      this.imgList[index].url = res.url
      // this.imgList[index].fileName = res.fileName
      this.imgList[index].fileSize = res.fileSize
      /* const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            // this.listObj[objKeyArr[i]].url = response.files.file
            this.listObj[objKeyArr[i]].url = response.data
            this.listObj[objKeyArr[i]].hasSuccess = true
          }
        } */
      // console.log(this.imgList)
      this.handleUpdate()
    },
    // 更新
    handleUpdate() {
      setTimeout(() => {
        // const imgList = Object.keys(this.listObj).map(v => this.listObj[v])
        // console.log(this.images)
        // this.imgList = imgList
        if (this.$parent.$options.componentName === 'ElFormItem') {
          this.$parent.$emit('el.form.change', [...this.imgList])
        }
        this.$emit('change', this.imgList)
        // this.$emit('successCBK', imgList)
      }, 200)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-upload-list__item {
  height: 25px;
  width: 100%;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: start;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;
}
.el-upload__tip {
  margin-top: 0;
  line-height: 20px;
  font-size: 12px;
  color: #999;
}
.fileUpload {
  padding: 10px 0;
  border-radius: 2px;
  border: 1px dashed rgba(221, 221, 221, 1);
  text-align: center;
  .iconfont {
    color: #2673ff;
  }
  /deep/ .el-upload-list {
    /deep/ .el-upload-list__item {
      height: 35px;
      line-height: 35px;
      /deep/ .el-icon-close {
        top: 10px;
      }
    }
  }
}
</style>
