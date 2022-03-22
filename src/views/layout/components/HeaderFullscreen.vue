<template>
  <el-tooltip
    effect="dark"
    :content="getFullscreen ? getLocale('layout_topBar_fullScreenEst') : getLocale('layout_topBar_fullScreen')"
    placement="bottom"
  >
    <el-button class="admin-mr btn-text" type="text" @click="toggle">
      <admin-icon v-if="getFullscreen" name="compress" />
      <admin-icon v-else name="arrows-alt" style="font-size: 16px" />
    </el-button>
  </el-tooltip>
</template>

<script>
import screenfull from 'screenfull'
import { getLocale } from '@/locales'

export default {
  name: 'HeaderFullscreen',
  props: {
    width: {
      type: Number,
      default: 22
    },
    height: {
      type: Number,
      default: 22
    },
    fill: {
      type: String,
      default: '#48576a'
    }
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  computed: {
    getFullscreen() {
      this.change()
      return this.isFullscreen
    }
  },
  mounted() {
    this.init()
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isFullscreen = false
      }
      /* if (screenfull.enabled) {
        screenfull.on('change', () => {
          if (!screenfull.isFullscreen) {
            this.isFullscreen = false
            console.log(0)
          }
        })
      } */
    }
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    getLocale,
    toggle() {
      if (!screenfull.enabled) {
        this.$message({
          message: '您的浏览器不支持全屏浏览',
          type: 'warning'
        })
        return false
      }
      /* if (screenfull.isFullscreen) {
        screenfull.exit()
        this.isFullscreen = false
      } else {
        screenfull.request()
        this.isFullscreen = true
      } */
      screenfull.toggle()
      // this.isFullscreen = !this.isFullscreen
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    },
    // 是否全屏并按键ESC键的方法
    checkFull() {
      let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    }
  }
}
</script>
