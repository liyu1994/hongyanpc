<template>
  <div class="admin-container-card">
    <div v-if="$slots.header" ref="header" class="admin-container-card__header">
      <slot name="header" />
    </div>
    <div ref="body" class="admin-container-card__body">
      <div class="admin-container-card__body-card">
        <slot />
      </div>
    </div>
    <div v-if="$slots.footer" ref="footer" class="admin-container-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import scroll from './mixins/normal'

export default {
  name: 'AdminContainerCard',
  mixins: [
    scroll
  ],
  mounted() {
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy() {
    // 移除滚动事件监听
    this.removeScrollListener()
  }
}
</script>
