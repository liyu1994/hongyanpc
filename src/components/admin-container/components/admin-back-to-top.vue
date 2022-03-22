<template>
  <el-tooltip effect="dark" content="返回顶端" placement="top">
    <transition :name="transitionName">
      <div v-show="show" :style="customStyle" class="back-to-ceiling" @click="handleClick">
        <svg width="16" height="16" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" class="Icon Icon--backToTopArrow" aria-hidden="true" style="height: 16px; width: 16px;">
          <!--<title>回到顶部</title>-->
          <g>
            <path d="M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z" fill-rule="evenodd" />
          </g>
        </svg>
      </div>
    </transition>
  </el-tooltip>
</template>

<script>
export default {
  name: 'AdminBackToTop',
  props: {
    // 显示关闭
    topVisible: {
      type: Boolean,
      default: false
    },
    transitionName: {
      type: String,
      default: 'fade'
    },
    customStyle: {
      type: Object,
      default: () => {
        return {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px',
          background: '#e7eaf1'
        }
      }
    },
    num: {
      type: Number,
      default: 0
    },
    topFn: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    show() {
      return this.num > 55 && this.topVisible
    }
  },
  methods: {
    handleClick() {
      if (typeof this.topFn === 'function') {
        this.topFn()
      }
    }
  }
}
</script>

<style scoped>
 .back-to-ceiling {
    position: fixed;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }
  .back-to-ceiling:hover {
    background: #d5dbe7;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }
  .back-to-ceiling .Icon {
    fill: #9aaabf;
    background: none;
  }
</style>
