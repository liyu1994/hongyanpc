<template>
  <div class="admin-container-full">
    <div v-if="$slots.header" ref="header" class="admin-container-full__header">
      <slot name="header" />
    </div>
    <div ref="body" class="admin-container-full__body">
      <slot />
    </div>
    <div v-if="$slots.footer" ref="footer" class="admin-container-full__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import scroll from './mixins/normal'

export default {
  name: 'AdminContainerFull',
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
