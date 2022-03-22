<template>
  <div class="pictureupload">
    <el-upload
      ref="upload"
      :action="imgURL"
      list-type="picture-card"
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
      <i class="el-icon-plus" />
      <!-- <div
        slot="tip"
        class="el-upload__tip"
      >只能上传{{ extensions.join('') }}文件，且不超过{{ size }}M</div> -->
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
      default: () => ['.png', '.jpg', '.jpeg'],
      type: Array
    },
    // 图片数量限制
    limit: {
      default: () => 20,
      type: Number
    },
    // 图片大小限制
    size: {
      default: () => 100,
      type: Number
    }
  },
  data() {
    return {
      // 请求地址
      imgURL: global.zh.uploadURL,
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
      this.headers.Authorization = util.getToken()
      // const ext = file.name.split('.').pop().toLowerCase()
      const index = file.name.lastIndexOf('.')
      const ext = file.name.substr(index).toLowerCase()
      const isLt2M = file.size / 1024 / 1024 < this.size
      if (!this.extensions.includes(ext)) {
        this.$message.error('上传文件只能是 ' + this.extensions.join(', ') + ' 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 ' + this.size + 'MB!')
        return false
      }
      // const _self = this
      const _URL = window.URL || window.webkitURL
      // const fileName = file.uid
      // this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = () => {
          this.imgList.push({ hasSuccess: false, uid: file.uid, url: img.src, name: file.name, width: this.width, height: this.height })
          // _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, url: img.src, name: file.name, width: this.width, height: this.height }
        }
        resolve(true)
      })
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
      this.$message.error(`${err.type} 文件上传失败`)
      this.handleRemove(file)
    },
    handlePictureCardPreview(file) {
      // const imgList = Object.keys(this.listObj).map(v => this.listObj[v])
      this.images = this.imgList.map(item => item.url)
      const index = this.imgList.findIndex(item => item.uid === file.uid)
      this.index = index
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
        this.$message.error('图片上传失败！')
        return
      }
      const uid = file.uid
      const index = this.imgList.findIndex(item => item.uid === uid)
      this.imgList[index].hasSuccess = true
      const res = response.data
      // console.log(res)
      this.imgList[index].url = res.uri
      this.imgList[index].httpUrl = res.httpUrl
      this.imgList[index].size = res.size
      this.imgList[index].name = res.name
      /* const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          // this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].url = response.data
          this.listObj[objKeyArr[i]].hasSuccess = true
        }
      } */
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
