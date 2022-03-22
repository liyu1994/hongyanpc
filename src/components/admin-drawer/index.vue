<!--
	作者：li
	时间：2019-03-22
	描述：抽屉组件, admin-drawer全局组件
-->

<template>
  <div :data-transfer="true">
    <transition name="fade-in">
      <div v-show="visible" v-if="mask" :class="maskClasses" :style="maskStyle" @click="handleMask" />
    </transition>
    <div :class="wrapClasses" @click="handleWrapClick">
      <transition :name="'move-' + placement">
        <div v-show="visible" :class="classes" :style="mainStyles">
          <div v-if="canMove" :class="[prefix + '-move']" />
          <div ref="content" :class="contentClasses">
            <a v-if="closable" class="admin-drawer-close" @click="close">
              <slot name="close">
                <i class="el-icon el-icon-close" />
              </slot>
            </a>
            <!--<div v-if="$slots.header" :class="[prefix + '-header']" ref="header">
              <slot name="header"><div :class="[prefix + '-header-inner']">{{ title }}</div></slot>
            </div>-->
            <div ref="header" :class="[prefix + '-header']">
              <div :class="[prefix + '-header-inner']">{{ title }}</div>
            </div>
            <div ref="body" :class="[prefix + '-body']" :style="styles">
              <slot />
            </div>
            <div v-if="$slots.footer" ref="footer" :class="[prefix + '-footer']">
              <slot name="footer" />
            </div>
            <!-- 插槽 -->
            <div
              v-if="draggable"
              :style="triggerStyle"
              :class="`${prefix}-trigger-wrapper`"
              @mousedown="handleTriggerMousedown"
              @touchstart="handleTriggerMousedown"
            >
              <slot name="trigger">
                <drag-drawer-trigger />
              </slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import DragDrawerTrigger from './drag-drawer-trigger.vue'
import Mixin from './mixin'
import { on, off, oneOf } from '@/libs/tools'

export default {
  name: 'Drawer',
  components: {
    DragDrawerTrigger
  },
  mixins: [Mixin],
  props: {
    // 是否显示 Drawer
    value: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: '提示'
    },
    // 宽度
    width: {
      type: [Number, String],
      default: 256
    },
    // 显示关闭按钮
    closable: {
      type: Boolean,
      default: true
    },
    // 点击遮盖层关闭
    maskClosable: {
      type: Boolean,
      default: true
    },
    // 启用遮盖层
    mask: {
      type: Boolean,
      default: true
    },
    // 遮盖层自定义样式
    maskStyle: {
      type: Object,
      default: () => {}
    },
    styles: {
      type: Object,
      default: () => {}
    },
    className: {
      type: String,
      default: ''
    },
    // 左侧栏/右侧栏
    placement: {
      validator(value) {
        return oneOf(value, ['left', 'right'])
      },
      default: 'right'
    },
    inner: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    // 是否可拖动修改宽度
    draggable: {
      type: Boolean,
      default: false
    },
    // 最小拖动宽度
    minWidth: {
      type: [String, Number],
      default: 256
    },
    // 关闭前回调
    beforeClose: {
      type: Function,
      default: () => ''
    },
    // 初始回调
    beforeDrag: {
      type: Function,
      default: () => ''
    }
  },
  data() {
    return {
      canMove: false,
      dragWidth: this.width,
      wrapperWidth: this.width,
      wrapperLeft: 0
    }
  },
  computed: {
    wrapClasses() {
      return [
        `${this.prefix}-wrap`,
        {
          [`${this.prefix}-hidden`]: !this.visible,
          [`${this.className}`]: !!this.className,
          [`${this.prefix}-no-mask`]: !this.mask,
          [`${this.prefix}-wrap-inner`]: this.inner,
          [`${this.prefix}-wrap-dragging`]: this.canMove
        }
      ]
    },
    mainStyles() {
      const style = {}
      const width = parseInt(this.dragWidth)
      const styleWidth = {
        width: width <= 100 ? `${width}%` : `${width}px`
      }
      Object.assign(style, styleWidth)
      return style
    },
    classes() {
      return [
        `${this.prefix}`,
        `${this.prefix}-${this.placement}`,
        {
          [`${this.prefix}-inner`]: this.inner
        }
      ]
    },
    contentClasses() {
      return [
        `${this.prefix}-full`,
        {
          [`${this.prefix}-full-no-mask`]: !this.mask
        }
      ]
    },
    maskClasses() {
      return [
        `${this.prefix}-mask`,
        {
          [`${this.prefix}-mask-inner`]: this.inner
        }
      ]
    },
    innerWidth() {
      // const width = this.width
      // return width <= 100 ? (this.wrapperWidth * width) / 100 : width
      const width = parseInt(this.dragWidth)
      return width <= 100 ? `${width}%` : `${width}px`
    },
    triggerStyle() {
      return {
        // [this.placement]: `${this.innerWidth}px`,
        [this.placement]: `${this.innerWidth}`,
        position: this.inner ? 'absolute' : 'fixed'
      }
    },
    visible: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        // 组件挂载到body下
        this.$el.style.zIndex = this.$ELEMENT.zIndex + 1
        document.body.appendChild(this.$el)
        // document.querySelector('body').appendChild(this.$el)
        this.handleSetWrapperWidth()
      } else {
        // document.querySelector('body').removeChild(this.$el)
        this.$el && this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
        this.close()
      }
    }
  },
  mounted() {
    if (this.visible) {
      document.body.appendChild(this.$el)
      this.handleSetWrapperWidth()
    }
  },
  destroyed() {
    this.$el && this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    close() {
      if (!this.beforeClose) {
        return this.handleClose()
      }
      const before = this.beforeClose()
      if (before && before.then) {
        before.then(() => {
          this.handleClose()
        })
      } else {
        this.handleClose()
      }
    },
    handleClose() {
      this.visible = false
      this.$emit('on-close')
    },
    handleMask() {
      if (this.maskClosable && this.mask) {
        this.close()
      }
    },
    handleWrapClick(event) {
      const className = event.target.getAttribute('class')
      if (className && className.indexOf(`${this.prefix}-wrap`) > -1) this.handleMask()
    },
    handleTriggerMousedown(event) {
      event.preventDefault()
      this.canMove = true
      if (typeof this.beforeDrag === 'function') {
        this.beforeDrag()
      }
      on(document, 'mousemove', this.handleMousemove)
      on(document, 'mouseup', this.handleMouseup)
      on(document, 'touchmove', this.handleMousemove)
      on(document, 'touchend', this.handleMouseup)
      this.$emit('on-resize-start')
      // 防止鼠标选中抽屉中文字，造成拖动trigger触发浏览器原生拖动行为
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
      // window.getSelection().removeAllRanges()
    },
    handleSetWrapperWidth() {
      const {
        width,
        left
      } = this.$el.getBoundingClientRect()
      this.wrapperWidth = width
      this.wrapperLeft = left
      if (this.wrapperWidth < this.width) {
        this.dragWidth = width
      }
      // this.wrapperWidth = document.body.clientWidth
      // this.wrapperLeft = document.body.scrollLeft
    },
    handleMousemove(event) {
      if (!this.canMove || !this.draggable) return
      // 更新容器宽度和距离左侧页面距离，如果是window则距左侧距离为0
      this.handleSetWrapperWidth()
      const left = event.pageX - this.wrapperLeft
      // 如果抽屉方向为右边，宽度计算需用容器宽度减去left
      let width = this.placement === 'right' ? this.wrapperWidth - left : left
      // 限定最小宽度
      width = Math.max(width, parseFloat(this.minWidth))
      event.atMin = width === parseFloat(this.minWidth)
      // 限定最大宽度
      if (width > this.wrapperWidth) {
        width = this.wrapperWidth
      }
      // 如果当前width不大于100，视为百分比
      if (width <= 100) width = (width / this.wrapperWidth) * 100
      this.dragWidth = width
      this.$emit('update:width', parseInt(width))
      this.$emit('on-resize-width', parseInt(this.dragWidth))
    },
    handleMouseup() {
      // if (!this.draggable) return
      if (this.canMove) {
        setTimeout(() => {
          this.canMove = false
        }, 0)
        off(document, 'mousemove', this.handleMousemove)
        off(document, 'mouseup', this.handleMouseup)
        off(document, 'touchmove', this.handleMousemove)
        off(document, 'touchend', this.handleMouseup)
        this.$emit('on-resize-end')
      }
    }
  }
}
</script>
