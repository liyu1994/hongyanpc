<template>
  <admin-container>
    <template slot="header">frame报表实例</template>

    <div v-loading="loading" class="admin-container-frame">
      <iframe
        v-for="item in iframeData"
        v-show="item.tag === $route.name"
        :key="item.tag"
        class="admin-container-frame"
        :class="item.tag"
        :src="item.src"
        frameborder="0"
      />
    </div>

  </admin-container>
</template>

<script>
export default {
  props: {
    iframeActive: {
      type: Boolean,
      default: false
    },
    isRouterAlive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      iframeData: [],
      loading: false
    }
  },
  watch: {
    $route() {
      if (this.iframeActive) {
        this.handleData()
      }
    },
    isRouterAlive() {
      if (this.iframeActive && !this.isRouterAlive) {
        const iframe = this.$el.querySelector(`.${this.$route.name}`)
        iframe.src = this.$el.querySelector(`.${this.$route.name}`).src
        this.loading = true
        iframe.onload = () => {
          this.loading = false
        }
      }
    }
  },
  mounted() {
    if (this.iframeActive) {
      this.handleData()
    }
  },
  methods: {
    handleData() {
      const name = this.$route.name
      const src = this.$route.meta.src
      if (!this.iframeData.some(v => v.tag === name) && this.iframeActive) {
        this.iframeData.push({ tag: name, src })
        this.loading = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-container-frame {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
}
</style>
