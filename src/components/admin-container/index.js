// 组件
import AdminContainerFull from './components/admin-container-full.vue'
import AdminContainerFullBs from './components/admin-container-full-bs.vue'
import AdminContainerGhost from './components/admin-container-ghost.vue'
import AdminContainerGhostBs from './components/admin-container-ghost-bs.vue'
import AdminContainerCard from './components/admin-container-card.vue'
import AdminContainerCardBs from './components/admin-container-card-bs.vue'
import AdminBackToTop from './components/admin-back-to-top.vue'

export default {
  name: 'AdminContainer',
  props: {
    // 容器样式
    type: {
      type: String,
      required: false,
      default: 'full'
    },
    // 滚动优化
    betterScroll: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      scrollTopNum: 0
    }
  },
  computed: {
    // 始终返回渲染组件
    component() {
      if (this.type === 'card' && !this.betterScroll) return AdminContainerCard
      if (this.type === 'card' && this.betterScroll) return AdminContainerCardBs
      if (this.type === 'ghost' && !this.betterScroll) return AdminContainerGhost
      if (this.type === 'ghost' && this.betterScroll) return AdminContainerGhostBs
      if (this.type === 'full' && !this.betterScroll) return AdminContainerFull
      if (this.type === 'full' && this.betterScroll) return AdminContainerFullBs
      else {
        return 'div'
      }
    }
  },
  render(h) {
    /* const slots = [
      h('div', this.$slots.default)
    ] */
    const slots = [this.$slots.default]
    if (this.$slots.header) slots.push(h('template', { slot: 'header' }, [this.$slots.header]))
    if (this.$slots.footer) slots.push(h('template', { slot: 'footer' }, [this.$slots.footer]))
    return h('div', {
      ref: 'container',
      class: 'container-component'
    }, [
      h(this.component, {
        ref: 'component',
        props: this.$attrs,
        on: {
          scroll: e => this.getScrollTo(e)
        }
      }, slots),
      h(AdminBackToTop, {
        props: {
          num: this.scrollTopNum,
          topFn: this.scrollToTop,
          ...this.$attrs
        }
      })
    ])
  },
  methods: {
    getScrollTo(e) {
      this.scrollTopNum = e.y
      this.$emit('scroll', e)
    },
    // 返回顶部
    scrollToTop() {
      this.$refs.component.scrollToTop()
      // 如果开启了 better scroll 还需要手动触发一遍 scroll 事件
      const bs = this.$refs.component.BS
      if (bs) this.$refs.component.scroll()
    },
    // 用法同原生方法 scrollBy
    scrollBy(x = 0, y = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollBy(-x, -y, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollBy(x, y)
      }
    },
    // 用法同原生方法 scrollTo
    scrollTo(x = 0, y = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollTo(-x, -y, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollTo(x, y)
      }
    },
    // 用法同原生方法 scrollTop
    scrollTop(top = 0, time = 300) {
      if (this.betterScroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollTo(bs.x, -top, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollTop = top
      }
    }
  }
}
